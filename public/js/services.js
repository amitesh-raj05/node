document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const customFontElements = document.querySelectorAll('.custom-font');

    // Ensure the navbar has the initial class
    navbar.classList.add('bg-body-tertiary-transparent');

    window.addEventListener('scroll', function () {
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
}

document.addEventListener("DOMContentLoaded", function () {
    var toggler = document.getElementById('navbarToggler');
    var collapse = document.querySelector('.navbar-collapse');
    var isCollapsed = true;

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
        collapse.classList.remove('hide');
        collapse.classList.add('show');
        isCollapsed = false;
    }

    // Function to collapse the navbar collapse
    function collapseNavbar() {
        collapse.classList.remove('show');
        collapse.classList.add('hide');
        isCollapsed = true;
    }

    // Event listener for toggler button click
    toggler.addEventListener('click', handleToggleClick);

    // Function to close navbar collapse when clicking outside
    function handleClickOutside(event) {
        if (!collapse.contains(event.target) && !toggler.contains(event.target) && !isCollapsed) {
            collapseNavbar();
        }
    }

    // Event listener to detect clicks anywhere on the page
    document.addEventListener('click', handleClickOutside);

});

document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");
    const text = header.innerHTML;
    header.innerHTML = "";
    let index = 0;

    function typeLetter() {
        if (index < text.length) {
            header.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeLetter, 300); // Adjust the speed of typing here
        }
    }

    // Start typing effect
    typeLetter();
});


document.addEventListener("DOMContentLoaded", function () {
    const header1 = document.getElementById("header1");
    const text1 = header1.innerHTML;
    header1.innerHTML = "";
    let index1 = 0;

    function typeLetter() {
        if (index1 < text1.length) {
            header1.innerHTML += text1.charAt(index1);
            index1++;
            setTimeout(typeLetter, 300); // Adjust the speed of typing here
        }
    }

    // Start typing effect
    typeLetter();
});





// Function to show lead content
function showLead(container) {
    const lead1 = container.querySelector('.lead1');
    if (lead1) {
        lead1.style.display = 'none';
    }
    const lead = container.querySelector('.lead');
    if (lead) {
        lead.style.display = 'block';
        lead.classList.add('fade-in-up'); // Add fade-in animation
    }
}

// Function to hide lead content
function hideLead(container) {
    const lead1 = container.querySelector('.lead1');
    if (lead1) {
        lead1.style.display = 'block';
    }
    const lead = container.querySelector('.lead');
    if (lead) {
        lead.style.display = 'none';
    }
}

// Function to toggle paragraph visibility
function toggleParagraph(hoverText) {
    const featuretteContainer = hoverText.closest('.featurette-container');
    const lead1 = featuretteContainer.querySelector('.lead1');
    const lead = featuretteContainer.querySelector('.lead');
    
    if (lead1 && lead) {
        if (lead.style.display === 'none') {
            lead1.style.display = 'none';
            lead.style.display = 'block';
            lead.classList.add('fade-in-up'); // Add fade-in animation
        } else {
            lead1.style.display = 'block';
            lead.style.display = 'none';
        }
    }
}


    
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

    const elements = document.querySelectorAll('.left');
    elements.forEach(element => {
        observer.observe(element);
    });

    const rightSide = document.querySelector('.left');
    observer.observe(rightSide);
});


document.addEventListener("DOMContentLoaded", function() {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-upright');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const elements = document.querySelectorAll('.right');
    elements.forEach(element => {
        observer.observe(element);
    });

    const rightSide = document.querySelector('.right');
    observer.observe(rightSide);
});
