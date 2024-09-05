class Carousel {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        data: [
          {
            name: "Employee Name",
            role: "Employee Role",
            link: "#",
            testimonial: "Lorem ipsum ",
          },
        ],
        length: options.data.length,
        class: "",
      },
      options
    );

    const el = this.options.container; //document.createElement("div");
    // el.className = `slider ${this.options.class}`;
    let slides = [],
      dots = [];

    for (let index = 0; index < this.options.length; index++) {
      const datum = this.options.data[index];
      const slideNumber = index + 1 - this.options.length;

      slides.push(`<div class="slide slide--${slideNumber}" style="transform: translateX(${
        slideNumber * 100
      }%)">
            <div class="carousel">
              <img class="carousel-image" src="${datum.link}" alt="${
        datum.name
      }" />
              <blockquote class="testimonial">
                <p class="testimonial-text">
                ${datum.testimonial}
                </p>
                <p class="testimonial-author">${datum.name}</p>
                <p class="testimonial-job">${datum.role}</p>
              </blockquote>
            </div>
          </div>`);

      dots.push(`<button class="dot" data-slide="${index}">&nbsp</button>`);
    }

    el.insertAdjacentHTML(
      "beforeend",
      `
      ${slides.join("")}
      <button class="slider__btn slider__btn--left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="btn-icon"
        strokeWidth="{1.5}"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  
    <button class="slider__btn slider__btn--right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        class="btn-icon"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  
    <div class="dots">
      ${dots.join("")}
    </div>`
    );
    // el.innerHTML =;

    // this.options.container.insertAdjacentElement("beforeend", el);
    this._events();
  }

  _events() {
    const [btnLeft, btnRight, dots] = this.options.container.querySelectorAll(
      ".slider__btn--left, .slider__btn--right, .dots"
    );
    const slides = this.options.container.querySelectorAll(".slide");

    let curSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = function (slide) {
      slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
      });
    };

    const nextSlide = function () {
      if (curSlide === maxSlide - 1) curSlide = 0;
      else curSlide++;

      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const previousSlide = function () {
      if (curSlide === 0) curSlide = maxSlide - 1;
      else curSlide--;

      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const activateDot = function (slide) {
      Array.from(dots.querySelectorAll(".dot")).forEach((dot) =>
        dot.classList.remove("dot--fill")
      );

      dots
        .querySelector(`.dot[data-slide="${slide}"]`)
        .classList.add("dot--fill");
    };

    activateDot(curSlide);
    goToSlide(curSlide);

    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", previousSlide);

    dots.addEventListener("click", function (e) {
      if (e.target.classList.contains("dot")) {
        const { slide } = e.target.dataset;

        goToSlide(slide);
        activateDot(slide);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") previousSlide();
      e.key === "ArrowRight" && nextSlide(); // short-circuiting
    });
  }
}

const carousel = new Carousel({
  container: document.querySelector("#section--2 .slider.container"),
  data: [
    {
      name: "Neil M. Bunch",
      role: "Pharmacy Technician",
      link: "img/pexels-olly-927451.jpg",
      testimonial:
        "I highly recommend their services to anyone seeking top-notch quality",
    },
    {
      name: "Cristina S. Hill",
      role: "Affirmative Action Coordinator",
      link: "img/pexels-olly-3769021.jpg",
      testimonial:
        "Their team is efficient and dedicated, ensuring a seamless experience from start to finish",
    },
    {
      name: "Maurice S. Mecham",
      role: "Quality Control Technician",
      link: "img/pexels-olly-806835.jpg",
      testimonial:
        " Their dedication and expertise made finding a new opportunity",
    },
    {
      name: "Marilyn A. Ewell",
      role: "Correspondence Clerk",
      link: "img/pexels-olly-914931.jpg",
      testimonial:
        "ABC Company truly delivered a reliable job search experience. I highly recommend their services!",
    },
  ],
  class: "container",
});
