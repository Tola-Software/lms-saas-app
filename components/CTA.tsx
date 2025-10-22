import Image from "next/image";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">✨ Start learning your way</div>
      <h2 className="text-3xl font-bold text-foreground leading-tight">Build Your Personalized Learning Companion</h2>
      <p className="text-muted-foreground leading-relaxed">
        Create a custom AI companion tailored to your learning style. Choose the subject, voice, and personality that
        works best for you.
      </p>
      <Image
        src="images/cta.svg"
        alt="Create your companion"
        width={362}
        height={232}
        className="dark:opacity-80 my-2"
      />
      <Link href="/companions/new" className="w-full">
        <button className="btn-primary-red w-full justify-center group">
          <Image
            src="/icons/plus.svg"
            alt="plus"
            width={14}
            height={14}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          <span>Create New Companion</span>
        </button>
      </Link>
    </section>
  );
};
export default Cta;
