// we are going to work with classes with object oriented programming
// we gonna to use how to use oop we are going to learn how to user oop

// we are going to creaqte MultiStepForm class and then call it after it
// we'll the property which contains the form, we have the property that contains the pages number of pages
// we also have next button like this this.nextButtons
// we also have previous buttons like  this this.prevButtons
// and also we'll have the method that enables the pagination
class MultiStepForm {
    constructor( _formId  ) {
        // get all the elements and enable the pages
        this.form = document.getElementById(_formId);
        this.pages = this.form.querySelectorAll('.form__page');
        this.nextButtons = this.form.querySelectorAll('.btn-next');
        this.prevButtons = this.form.querySelectorAll('.btn-prev');
        this.maxPage = this.getMaxPage();

            // call method that enable the pagination
        this.initializeButtons(this.prevButtons, this.nextButtons );
    }


    initializeButtons( prevButtons, nextButtons ) {
        // initialize pagination // it has two arguments prev and next buttons
        nextButtons.forEach( (btn) => {
            // add event listener to change to next page
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                // lets get the current page and we need to go to currentpage+1
                const currentPage = this.getCurrentPage();
                this.goToPage(currentPage + 1);
            } );
        });
        prevButtons.forEach((btn) => {
            // add event listener to change to prev page
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                // lets get the current page and we need to go to currentpage+1
                const currentPage = this.getCurrentPage();
                this.goToPage(currentPage - 1);
            } );
        })
    }

    getCurrentPage() {
        // return current active page
        // to get the current page we need to add extra element to our html of form
        const currentPage = parseInt( this.form.dataset.currentPage, 10 );
        return currentPage;
    }

    goToPage( pageNumber ) {
        // test that page exists
        const maxPagte  = this.getMaxPage();
        if( pageNumber > this.maxPage || pageNumber < 1 ) {
            alert('No such page');
        } 

        this.pages.forEach( (page) => {
            // hide page
            this.hidePage( page );
            // page = target page => show the page
            const currentPageNumber = parseInt( page.dataset.page, 10 );
            // updatge dataset
            currentPageNumber === pageNumber && this.showPage( page );
        });
        
        this.form.dataset.currentPage = pageNumber;
        this.updateProgressBar();
    }

    getMaxPage() {
        // return max num of pages
        const maxPage = parseInt(this.form.dataset.maxPage, 10);
        return maxPage;
    }

    updateProgressBar() {
        // colorize active step in progress bar
        // et the progressbar steps
        const allSteps = this.form.querySelectorAll(".page-step");
        // get currentpage
        const currentPage = this.getCurrentPage();
        // for each step 
        allSteps.forEach( (step) => {
            // uncolor all of them
            step.classList.contains('active') && step.classList.remove("active");
            const stepNumber = parseInt( step.dataset.number, 10 );
            if( stepNumber <= currentPage ) {
                step.classList.add("active");
            }
        });

            // color until current step

    }

    hidePage( page ) {
        // hide the page, 
        page.classList.contains("active") && page.classList.remove("active");
    }

    showPage( page ) {
        // show active class
        page.classList.add("active");
    }

}


new MultiStepForm( "multi-step-form" );