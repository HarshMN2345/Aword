"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
export function CardCarousal() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
      ));
     
      return (
        <div className="w-full h-full py-20">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Get to know Aword.
          </h2>
          <Carousel items={cards} />
        </div>
      );
}
const DummyContent = () => {
    return (
      <>
        {[...new Array(3).fill(1)].map((_, index) => {
          return (
            <div
              key={"dummy-content" + index}
              className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                  The first rule of Apple club is that you boast about Apple club.
                </span>{" "}
                Keep a journal, quickly jot down a grocery list, and take amazing
                class notes. Want to convert those notes to text? No problem.
                Langotiya jeetu ka mara hua yaar is ready to capture every
                thought.
              </p>
              <Image
                src="https://assets.aceternity.com/macbook.png"
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
              />
            </div>
          );
        })}
      </>
    );
  };
   
  const data = [
    {
      category: "Instant Setup",
      title: "Generate a room link in seconds",
      src: "https://imgs.search.brave.com/XP-0Ml2hKKWfpkyau23jF1b1QeF0WkM71BGMX8S6OAU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sZWFy/bi5nMmNyb3dkLmNv/bS9odWJmcy9oaXN0/b3J5JTIwb2YlMjBj/b21tdW5pY2F0aW9u/JTIwY2F2ZSUyMHBh/aW50aW5ncy5qcGc",
      content: <DummyContent />,
    },
    {
      category: "Secure",
      title: "Password protected for your private conversation",
      src: "https://imgs.search.brave.com/szwTRG5b4JlbfKrN7K0hP1bqx-MeozwlryNyNUhuH8E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZW5k/ZXIuZmluZWFydGFt/ZXJpY2EuY29tL2lt/YWdlcy9yZW5kZXJl/ZC9tZWRpdW0vcHJp/bnQvOC82L2JyZWFr/L2ltYWdlcy1tZWRp/dW0tNS9sb2NrZWQt/ZG9vcnMtc2FtLXNp/ZGRlcnMuanBn",
      content: <DummyContent />,
    },
    {
      category: "End-to-End Encryption",
      title: "Messages are encrypted for complete privacy",
      src: "https://imgs.search.brave.com/o6sgi0ofSj55OINeeXlIn8BvNO81LMxKnD1SyIXl6Ic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbGx0/aGF0c2ludGVyZXN0/aW5nLmNvbS93b3Jk/cHJlc3Mvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjIvMDIvZW1w/ZXJvci1jbGF1ZGl1/cy5qcGc",
      content: <DummyContent />,
    },
    {
      category: "Self-Destructing Messages",
      title: "Messages disappear after a set time",
      src: "https://imgs.search.brave.com/yvjhGmMswQNQEWEVZFMaUDhCSvauoBmwc4EfwX5Oj_g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5qaW1jZG4uY29t/L2FwcC9jbXMvaW1h/Z2UvdHJhbnNmL2Rp/bWVuc2lvbj00NDR4/MTAwMDA6Zm9ybWF0/PWpwZy9wYXRoL3My/MjE3Y2QwYmIxMjIw/NDE1L2ltYWdlL2ll/ZWUwN2QwOWQ5MmJm/ZjJiL3ZlcnNpb24v/MTY4NDAxNjkwNS90/aGUtcHJhZXRvcmlh/bi1ndWFyZHMuanBn",
      content: <DummyContent />,
    },
  ];
  