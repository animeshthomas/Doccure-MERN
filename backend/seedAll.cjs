const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = 'mongodb+srv://docApp:n5UzjV725dkqtvk6@cluster0.j4oheo9.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

async function seed() {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');

  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    photo: { type: String },
    role: { type: String, enum: ['patient', 'admin'], default: 'patient' },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    bloodType: { type: String },
    appointments: [{ type: mongoose.Types.ObjectId, ref: 'Booking' }],
    isPremiumUser: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: true }
  });

  const DoctorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    photo: { type: String },
    ticketPrice: { type: Number },
    role: { type: String, default: 'doctor' },
    specialization: { type: String },
    qualifications: { type: Array },
    experiences: { type: Array },
    emailVerified: { type: Boolean, default: true },
    bio: { type: String },
    about: { type: String },
    timeSlots: { type: Array },
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
    averageRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    isApproved: { type: String, default: 'approved' },
    appointments: [{ type: mongoose.Types.ObjectId, ref: 'Booking' }]
  });

  const BookingSchema = new mongoose.Schema({
    doctor: { type: mongoose.Types.ObjectId, ref: 'Doctor', required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    ticketPrice: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'approved' },
    isPaid: { type: Boolean, default: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true }
  }, { timestamps: true });

  const ReviewSchema = new mongoose.Schema({
    doctor: { type: mongoose.Types.ObjectId, ref: 'Doctor' },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5, default: 5 }
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
  const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
  const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Password123!', salt);

  const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Steven', 'Ashley', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['male', 'female'];
  const specialties = ['Cardiologist', 'Neurologist', 'Dermatologist', 'Pediatrician', 'Orthopedic Surgeon', 'Psychiatrist', 'Ophthalmologist', 'General Physician', 'Gynecologist', 'ENT Specialist'];

  const avatarPhotos = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
  ];

  console.log('1. Upserting 80 patients...');
  const patientMap = [];
  for (let i = 1; i <= 80; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const gender = genders[i % 2];
    const email = 'patient' + i + '@doccure.com';
    const patientDoc = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          name: fn + ' ' + ln,
          email: email,
          password: hashedPassword,
          role: 'patient',
          gender: gender,
          bloodType: bloodTypes[i % bloodTypes.length],
          phone: 9000000000 + i,
          emailVerified: true,
          isPremiumUser: (i % 4 === 0),
          photo: avatarPhotos[i % avatarPhotos.length]
        }
      },
      { upsert: true, new: true }
    );
    patientMap.push(patientDoc);
  }
  console.log('Done 80 patients.');

  console.log('2. Upserting 20 doctors...');
  const doctorMap = [];
  for (let i = 1; i <= 20; i++) {
    const fn = firstNames[(i * 7) % firstNames.length];
    const ln = lastNames[(i * 5) % lastNames.length];
    const spec = specialties[(i - 1) % specialties.length];
    const email = 'doctor' + i + '@doccure.com';
    const doctorDoc = await Doctor.findOneAndUpdate(
      { email: email },
      {
        $set: {
          name: 'Dr. ' + fn + ' ' + ln,
          email: email,
          password: hashedPassword,
          role: 'doctor',
          specialization: spec,
          ticketPrice: 40 + (i * 5),
          emailVerified: true,
          isApproved: 'approved',
          bio: 'Specialist in ' + spec + ' with modern medical care.',
          about: 'Dr. ' + fn + ' ' + ln + ' is dedicated to patient health with over ' + (6 + (i % 14)) + ' years of clinical experience in ' + spec + '.',
          phone: 9100000000 + i,
          photo: avatarPhotos[(i + 3) % avatarPhotos.length],
          timeSlots: [
            { day: 'Monday', startingTime: '09:00', endingTime: '13:00' },
            { day: 'Wednesday', startingTime: '10:00', endingTime: '15:00' },
            { day: 'Friday', startingTime: '14:00', endingTime: '18:00' }
          ],
          qualifications: [
            { startingDate: '2010-01-01', endingDate: '2015-06-01', degree: 'MD - ' + spec, university: 'National Medical Academy' }
          ],
          experiences: [
            { startingDate: '2015-07-01', endingDate: '2024-01-01', position: 'Lead ' + spec, hospital: 'Metropolitan Medical Center' }
          ]
        }
      },
      { upsert: true, new: true }
    );
    doctorMap.push(doctorDoc);
  }
  console.log('Done 20 doctors.');

  console.log('3. Seeding reviews...');
  const reviewTexts = [
    'Outstanding doctor! Very compassionate and thorough in diagnosis.',
    'Explained everything clearly and the treatment worked wonders. Highly recommend!',
    'Great bedside manner and very knowledgeable. Very satisfied with my visit.',
    'Friendly clinic staff, minimal waiting time, and excellent medical guidance.',
    'Dr was very attentive and listened carefully to all my symptoms.',
    'Top notch care! Follow up was super quick and reassuring.',
    'Extremely professional. Best specialist in this field.',
    'Helped me recover faster than expected. Very grateful!'
  ];

  // Clear existing dummy reviews & bookings to prevent infinite duplication
  await Review.deleteMany({});
  await Booking.deleteMany({});

  const allReviews = [];
  for (let dIdx = 0; dIdx < doctorMap.length; dIdx++) {
    const doc = doctorMap[dIdx];
    const docReviews = [];
    const numReviews = 3 + (dIdx % 5); // 3 to 7 reviews per doctor
    let ratingSum = 0;

    for (let r = 0; r < numReviews; r++) {
      const patient = patientMap[(dIdx * 4 + r) % patientMap.length];
      const rating = 4 + ((r + dIdx) % 2); // 4 or 5 stars
      ratingSum += rating;
      const reviewDoc = await Review.create({
        doctor: doc._id,
        user: patient._id,
        reviewText: reviewTexts[(dIdx + r) % reviewTexts.length],
        rating: rating
      });
      docReviews.push(reviewDoc._id);
    }

    const avgRating = parseFloat((ratingSum / numReviews).toFixed(1));
    await Doctor.findByIdAndUpdate(doc._id, {
      reviews: docReviews,
      averageRating: avgRating,
      totalRating: numReviews * 18 + 15
    });
  }
  console.log('Done seeding reviews and ratings.');

  console.log('4. Seeding appointments / bookings...');
  const appointmentTimes = ['09:30 AM', '10:15 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:45 PM'];
  const statuses = ['approved', 'approved', 'approved', 'pending', 'cancelled'];

  for (let b = 1; b <= 60; b++) {
    const doc = doctorMap[b % doctorMap.length];
    const patient = patientMap[b % patientMap.length];
    const date = new Date();
    date.setDate(date.getDate() + ((b % 20) - 5)); // dates from 5 days ago to 15 days ahead

    const booking = await Booking.create({
      doctor: doc._id,
      user: patient._id,
      ticketPrice: String(doc.ticketPrice || 50),
      status: statuses[b % statuses.length],
      isPaid: true,
      appointmentDate: date,
      appointmentTime: appointmentTimes[b % appointmentTimes.length]
    });

    // Link booking to user and doctor
    await User.findByIdAndUpdate(patient._id, { $addToSet: { appointments: booking._id } });
    await Doctor.findByIdAndUpdate(doc._id, { $addToSet: { appointments: booking._id } });
  }
  console.log('Done seeding 60 appointments.');

  const totalUsers = await User.countDocuments();
  const totalDoctors = await Doctor.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalBookings = await Booking.countDocuments();

  console.log('\n================ DATA SEED SUMMARY ================');
  console.log('Patients & Admins in DB:', totalUsers);
  console.log('Doctors in DB:', totalDoctors);
  console.log('Total Accounts:', totalUsers + totalDoctors);
  console.log('Total Reviews:', totalReviews);
  console.log('Total Appointments/Bookings:', totalBookings);
  console.log('All accounts password: Password123!');
  console.log('All accounts emailVerified: true');
  console.log('All doctors isApproved: approved');
  console.log('====================================================\n');

  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });