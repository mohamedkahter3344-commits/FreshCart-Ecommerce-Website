import Image from "next/image";
import { Brand } from "@/interface/product.t";
import  Link  from 'next/link';

const SingleBrand = ({ singleBrand }: { singleBrand: Brand }) => {
  return (
    <article className="group flex min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 sm:p-3">
      <Link href={`/brand/${singleBrand._id}`}>
      
      <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl bg-slate-50 transition-colors duration-300 group-hover:bg-violet-50 sm:h-28">
        <Image
          src={singleBrand.image}
          alt={singleBrand.name}
          fill
          sizes="(max-width: 640px) 50vw, 180px"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      </Link>

      <div className="flex min-h-10 items-center justify-center px-1 pt-3">
        <h3 className="text-center text-sm font-semibold text-slate-600 transition-colors group-hover:text-violet-700">
          {singleBrand.name}
        </h3>
      </div>
    </article>
  );
};

export default SingleBrand;