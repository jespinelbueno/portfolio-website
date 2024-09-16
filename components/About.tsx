import Image from 'next/image'

export function About() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center text-white bg-black" id="about">
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Juan Espinel
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Full Stack Development | Cybersecurity
            </p>
          </div>
          <Image
            src="/images/headshotsq.jpg"
            alt="Your Name"
            className="rounded-full"
            height={200}
            width={200}
          />
        </div>
      </div>
    </section>
  )
}