import Image from "next/image";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way.</div>
      <h2 className="text-3xl font-bold text-foreground">Build and Personalize Learning Companion</h2>
      <p className="text-muted-foreground">
        Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural
        and fun.
      </p>
      <Image src="images/cta.svg" alt="cta" width={362} height={232} className="dark:opacity-80" />
      <Link href="/companions/new" className="w-full">
        <button className="btn-primary-red w-full justify-center">
          <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
          <span>Build a New Companion</span>
        </button>
      </Link>
    </section>
  );
};
export default Cta;
