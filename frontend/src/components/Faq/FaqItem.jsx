import { useState } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div 
      className={`p-5 lg:p-6 rounded-2xl border transition-all duration-300 mb-4 cursor-pointer ${
        isOpen 
          ? "bg-white border-primaryColor/30 shadow-md ring-2 ring-primaryColor/5" 
          : "bg-white/60 hover:bg-white border-slate-200 shadow-sm"
      }`}
      onClick={toggleAccordion}
    >
      <div className="flex items-center justify-between gap-5">
        <h4 className="text-[17px] sm:text-[19px] font-[700] text-headingColor tracking-tight">
          {item.question}
        </h4>
        <div 
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen 
              ? "bg-primaryColor text-white shadow-cardGlow rotate-180" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isOpen ? <AiOutlineMinus className="w-4 h-4" /> : <AiOutlinePlus className="w-4 h-4" />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-100 animate-slideDown">
          <p className="text-[15px] leading-7 font-[400] text-textColor">
            {item.content}
          </p>
        </div>
      )}
    </div>
  )
}

export default FaqItem