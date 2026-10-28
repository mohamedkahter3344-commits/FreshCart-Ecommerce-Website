
import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUndoAlt,
} from "react-icons/fa";

const StoreBenefits = () => {
  return (
   <section className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:grid-cols-4 sm:gap-4 sm:p-5">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaTruck size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                Free Shipping
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                On orders over 500 EGP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaUndoAlt size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                Easy Returns
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                Hassle-free returns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaShieldAlt size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                Secure Payment
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                Your data is protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
              <FaHeadset size={18} />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 sm:text-sm">
                24/7 Support
              </h3>
              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default StoreBenefits
