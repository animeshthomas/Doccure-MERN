import { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
const FaqItem = ({ item }) => {

    const [isOpen, setIsOpen] = useState(false)
    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="p-3 lg:p-5 rounded-[12px] border border-slid border-[#D9DCE2] mb-5 cursor-pointer">
            <div className="flex items-center justify-between gap-5" onClick={toggleAccordion}>
                <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">{item.question}</h4>
                <div className={`${isOpen && "bg-primaryColor text-white border-none"} w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}>
                    {isOpen ? <AiOutlineMinus className="text-[18px] leading-6 text-headingColor" /> : <AiOutlinePlus className="text-[18px] leading-6 text-headingColor" />}
                </div>
            </div>
            {isOpen&&
            <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 text-textColor mt-3 lg:mt-5">{item.content}</p>
            }
        </div>
    )
}

export default FaqItem