console.log("Secret sauce loaded.");

//----------------------------------------------------------------------------------------
// When the user scrolls down, we want to cancel our animation delays. CSS will handle
// .scrolled globally.
const initialScrollListener = () => {
   if (window.scrollY > 100) {
      console.log("Caught first scroll!");
      window.removeEventListener('scroll', initialScrollListener);

      document.body.classList.add("scrolled");
   }
};

//----------------------------------------------------------------------------------------
function delay(ms: number) {
   return new Promise(r => {setTimeout(r, ms);});
}

//----------------------------------------------------------------------------------------
// Nav button fade animations.
async function fadeAnimations() {
   await delay(3000); // Initial delay.
   const buttons = document.querySelectorAll('.navbutton');
   for (const button of buttons) {
      // Will this be in order?
      button.classList.add('fade-in');
      await delay(150);
   }

   document.querySelector(".main-content-box")?.classList.add('fade-in');
}

//----------------------------------------------------------------------------------------


window.addEventListener('scroll', initialScrollListener);
setTimeout(initialScrollListener, 50);
fadeAnimations();
