import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';
import Stripe from 'stripe';
import { sendEmail } from '../Services/emailService.js';
import { bookingSuccessEmailDoctor, bookingSuccessEmailUser } from '../emailContents/mailContents.js';

export const getCheckoutSession = async (req, res) => {
    try {
        // Retrieve doctor and user information
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);

        // Create a Stripe instance
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // Assuming appointmentDate and appointmentTime are passed in the request body
        const { appointmentDate, appointmentTime } = req.body;

        // Create a checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.id,
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        unit_amount: doctor.ticketPrice * 100,
                        product_data: {
                            name: doctor.name,
                            description: doctor.bio,
                            images: [doctor.photo]
                        },
                    },
                    quantity: 1
                }
            ],
        });

        // Create a new booking with appointmentDate and appointmentTime
        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id,
            appointmentDate,
            appointmentTime
        });

        // Save the booking to the database
        await booking.save();

        // Send emails to the doctor and the user
        await sendEmail({
            to: doctor.email,
            subject: 'New Booking Notification',
            html: bookingSuccessEmailDoctor(doctor.name, user.name, appointmentDate, appointmentTime)
        });

        await sendEmail({
            to: user.email,
            subject: 'Booking Confirmation',
            html: bookingSuccessEmailUser(doctor.name, user.name, appointmentDate, appointmentTime)
        });

        // Respond with success message and session data
        res.status(200).json({ success: true, message: 'Successfully Paid', session });
    } catch (error) {
        // Handle errors
        console.error('Error creating checkout session:', error);
        res.status(500).json({ success: false, message: 'Error creating checkout session' });
    }
}
