document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const customFontElements = document.querySelectorAll('.custom-font');

    // Ensure the navbar has the initial class
    navbar.classList.add('bg-body-tertiary-transparent');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.remove('bg-body-tertiary-transparent');
            navbar.classList.add('bg-body-tertiary-colored');

            // Add the new style property to .custom-font elements
            customFontElements.forEach(element => {
                element.style.color = '#000';  // Add new style property
            });
        } else {
            navbar.classList.remove('bg-body-tertiary-colored');
            navbar.classList.add('bg-body-tertiary-transparent');

            // Remove the new style property from .custom-font elements
            customFontElements.forEach(element => {
                element.style.color = '#ffffff';  // Revert to original style property
            });
        }
    });
});

function toggleDropdown(button) {
    var dropdownBar = button.parentElement;
    var dropdownContent = dropdownBar.querySelector('.dropdown-content');
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }

    if (dropdownContent.classList.contains('show')) {
        // Calculate and set max-height based on content
        const maxHeight = dropdownContent.scrollHeight + "px";
        dropdownContent.style.maxHeight = maxHeight;
    } else {
        dropdownContent.style.maxHeight = "0";
    }
}

function toggleDropdown(button) {
    var dropdownContent = button.nextElementSibling;
    if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
        dropdownContent.classList.add("hide");
    } else {
        dropdownContent.classList.remove("hide");
        dropdownContent.classList.add("show");
    }
}
document.addEventListener("DOMContentLoaded", function() {
    var toggler = document.getElementById('navbarToggler');
    var collapse = document.querySelector('.navbar-collapse');

    var isCollapsed = true;
    var collapseHeight = collapse.scrollHeight;

    // Function to handle clicks on the toggler button
    function handleToggleClick() {
        if (isCollapsed) {
            expandNavbar();
        } else {
            collapseNavbar();
        }
    }

    // Function to expand the navbar collapse
    function expandNavbar() {
        collapse.style.display = 'block'; // Ensure the collapse is visible
        var height = collapse.scrollHeight;
        collapse.style.maxHeight = height + 'px'; // Set max-height to the calculated height
        isCollapsed = false;
    }

    // Function to collapse the navbar collapse
    function collapseNavbar() {
        collapse.style.maxHeight = '0px'; // Collapse by setting max-height to 0
        isCollapsed = true;
    }

    // Event listener for toggler button click
    toggler.addEventListener('click', handleToggleClick);

    // Function to close navbar collapse when clicking outside
    function handleClickOutside(event) {
        if (!collapse.contains(event.target) && !toggler.contains(event.target)) {
            collapseNavbar();
        }
    }

    // Event listener to detect clicks anywhere on the page
    document.addEventListener('click', handleClickOutside);
});


document.addEventListener("DOMContentLoaded", function() {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const elements = document.querySelectorAll('.col.d-flex.flex-column.gap-2');
    elements.forEach(element => {
        observer.observe(element);
    });

    const rightSide = document.querySelector('.col.d-flex.flex-column.align-items-start.gap-2');
    observer.observe(rightSide);
});


document.addEventListener("DOMContentLoaded", function() {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-upleft');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const elements = document.querySelectorAll('.dropdown-toggle');
    elements.forEach(element => {
        observer.observe(element);
    });

    const rightSide = document.querySelector('.dropdown-toggle');
    observer.observe(rightSide);
});


document.addEventListener("DOMContentLoaded", function() {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const elements = document.querySelectorAll('.card');
    elements.forEach(element => {
        observer.observe(element);
    });

    const rightSide = document.querySelector('.card');
    observer.observe(rightSide);
});












