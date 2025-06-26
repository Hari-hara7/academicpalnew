import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "V Adithya",
    username: "@vadithya",
    body: "I love Academic Pal! It has made studying so much easier for me.",
    img: "https://avatar.vercel.sh/adithya",
  },
  {
    name: "Prajwal",
    username: "@prajwal",
    body: "The notes provided here are excellent. They helped me ace my exams!",
    img: "https://avatar.vercel.sh/prajwal",
  },
  {
    name: "Nagendra",
    username: "@nagendra",
    body: "Academic Pal has been a lifesaver for my studies. Highly recommended!",
    img: "https://avatar.vercel.sh/nagendra",
  },
  {
    name: "Pranjali P.A",
    username: "@pranjali",
    body: "There are no bugs as of now. This website is a godsend and it saved me for so many subjects. Thank you so much for this!!!",
    img: "https://avatar.vercel.sh/pranjali",
  },
  {
    name: "Anup C",
    username: "@anup",
    body: "The website is actually good. It's like a last moment savior. Nothing.",
    img: "https://avatar.vercel.sh/anup",
  },
  {
    name: "Maneesh",
    username: "@maneesh",
    body: "Recommended for its informative and useful resources during exam times.",
    img: "https://avatar.vercel.sh/maneesh",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur",
        // Border: White with transparency
        "border-white/20",
        // Background: subtle transparent white
        "bg-white/5 hover:bg-white/10",
        // Text: pure white
        "text-white"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/60">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-white">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black py-10">
         <h2 className="text-2xl md:text-4xl  text-white mb-8 font-bold font-poppins">
        ❤️ Loved by Our Students
      </h2>
      <Marquee pauseOnHover className="[--duration:25s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
    </div>
  );
}
