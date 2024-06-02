document.addEventListener("DOMContentLoaded", function () {
  // fetch github account details from github api
  async function fetchGitHub() {
    try {
      const response = await fetch(
        "https://api.github.com/users/Kartelcodes/repos?page=1&per_page=10&sort=updated"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // get response in json format
      const result = await response.json();
      console.log("Server response:", result); // Debugging line to inspect the response

      // divs to hold github account data
      const gitHubProfile = document.getElementById("github-img");
      const gitHubUser = document.getElementById("gitHub-username");
      const gitHubLink = document.getElementById("github-profile-link");
      const gitHubIconLink = document.getElementById("github-profile-icon");

      // applying the changes to the github section
      gitHubProfile.src = result[0].owner.avatar_url;
      gitHubUser.innerText = result[0].owner.login;
      gitHubLink.href = result[0].owner.html_url;
      gitHubLink.innerText = result[0].owner.html_url;
      gitHubIconLink.href = result[0].owner.html_url;

      // insert github repos in html
      const reposList = document.getElementById("githubReposList");
      result.forEach((repo) => {
        if (!repo.private) {
          const listItem = document.createElement("li");

          const containerDiv = document.createElement("div");
          containerDiv.classList.add("repo");

          const iconSpan = document.createElement("span");
          const icon = document.createElement("i");
          icon.setAttribute("data-lucide", "send-horizontal");
          icon.classList.add("service-icon");
          iconSpan.appendChild(icon);

          const link = document.createElement("a");
          link.classList.add("github-link");
          link.href = repo.html_url;
          link.target = "_blank";
          link.textContent = repo.name;

          // Append the icon span and link to the container div
          containerDiv.appendChild(iconSpan);
          containerDiv.appendChild(link);

          // Create a description element
          const description = document.createElement("p");
          description.classList.add("repo-description");
          description.textContent =
            `Description: ${repo.description}` || "No description provided.";

          // Append elements to the list item
          listItem.appendChild(containerDiv);
          listItem.appendChild(description); // Add the description

          reposList.appendChild(listItem);

          // Initialize Lucide icons
          lucide.createIcons();
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  // call gitHub api funtion
  fetchGitHub();

  // fetch comments from backend
  async function fetchAndDisplayReviews() {
    try {
      const response = await fetch(
        "https://regina-portfolio-suck.onrender.com/api/comment"
      );

      if (!response.ok) {
        throw new Error(`HTTPS error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result); // Debugging line to inspect the response

      // Access the data property which contains the array of reviews
      const reviews = result.data;

      if (!Array.isArray(reviews)) {
        throw new Error("Unexpected response format: expected an array.");
      }

      const reviewContainer = document.querySelector(".review-cards");

      // Clear any existing reviews
      reviewContainer.innerHTML = "";

      // insert reviews inside the review section
      reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-card";

        const reviewContent = document.createElement("div");
        reviewContent.className = "review-content";

        const reviewHead = document.createElement("h4");
        reviewHead.className = "review-head";
        reviewHead.textContent = review.name;

        const reviewDate = document.createElement("div");
        reviewDate.className = "review-date";
        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = review.Date; // Placeholder for the current date
        reviewDate.appendChild(dateSpan);

        const reviewMessage = document.createElement("div");
        reviewMessage.className = "review-message";
        const messageParagraph = document.createElement("p");
        messageParagraph.textContent = review.message;

        reviewMessage.appendChild(messageParagraph);
        reviewContent.appendChild(reviewHead);
        reviewContent.appendChild(reviewDate);
        reviewContent.appendChild(reviewMessage);
        reviewCard.appendChild(reviewContent);
        reviewContainer.appendChild(reviewCard);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Call the function to fetch and display reviews
  fetchAndDisplayReviews();

  // adds interactivity (shadow over the mouse when hover on the card) to the benefits cards
  document.getElementById("benefit-cards").onmousemove = (e) => {
    for (const card of document.getElementsByClassName("benefits-card")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  // variables and functions to handle submission of a review
  const reviewForm = document.getElementById("review-form-main");
  const fullNameInput = document.getElementById("fullName");
  const messageInput = document.getElementById("message");

  let sent = false;

  // chacks if a string has a whitespace or is empty
  function isStringEmptyOrWhitespace(str) {
    return !str || /^\s*$/.test(str);
  }

  // Sends a post to backend server containing the review submitted
  async function sendMsg(event) {
    event.preventDefault(); // Prevent default form submission behavior

    if (!sent) {
      // if name is empty save the name as Anonymous
      const name = isStringEmptyOrWhitespace(fullNameInput.value)
        ? "Anonymous"
        : fullNameInput.value;
      const message = messageInput.value;

      if (!isStringEmptyOrWhitespace(message)) {
        // Try if request and response are correctly executed
        try {
          // posting new comment to backend api
          const response = await fetch(
            "https://regina-portfolio-suck.onrender.com/api/comment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                message: message,
              }),
            }
          );

          const result = await response.json();
          console.log("Server response:", result); // Debugging line to inspect the response

          const reviewContainer = document.querySelector(".review-cards");

          // Add the new review to the reviews section
          const reviewCard = document.createElement("div");
          reviewCard.className = "review-card";

          const reviewContent = document.createElement("div");
          reviewContent.className = "review-content";

          const reviewHead = document.createElement("h4");
          reviewHead.className = "review-head";
          reviewHead.textContent = name;

          // Creating new variable containing today's date
          const currentDate = new Date();

          // Get day, month, and year
          const day = String(currentDate.getDate()).padStart(2, "0"); // Ensure two digits with leading zero
          const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
          const year = currentDate.getFullYear();

          // Construct the date string in the desired format
          const formattedDate = `${day}/${month}/${year}`;

          // Adding the date to the new review card
          const reviewDate = document.createElement("div");
          reviewDate.className = "review-date";
          const dateSpan = document.createElement("span");
          dateSpan.className = "date";
          dateSpan.textContent = formattedDate; // Placeholder for the current date
          reviewDate.appendChild(dateSpan);

          const reviewMessage = document.createElement("div");
          reviewMessage.className = "review-message";
          const messageParagraph = document.createElement("p");
          messageParagraph.textContent = message;
          reviewMessage.appendChild(messageParagraph);

          reviewContent.appendChild(reviewHead);
          reviewContent.appendChild(reviewDate);
          reviewContent.appendChild(reviewMessage);

          reviewCard.appendChild(reviewContent);
          // Use prepend to add the new review at the start
          reviewContainer.prepend(reviewCard);

          if (!result.success) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            alert("Review submitted successfully.");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Ensure you enter a message before sending");
      }
    }
  }

  reviewForm.addEventListener("submit", sendMsg);

  // Function to update character count for name input
  function updateNameCount() {
    const nameInput = document.getElementById("fullName");
    const nameCount = document.getElementById("name-count");
    const nameLength = nameInput.value.trim().length; // Trim whitespace before counting
    nameCount.textContent = nameLength;

    // Update color based on length
    nameCount.style.color = nameLength < 2 ? "red" : "green";
  }

  // Function to update character count for message textarea
  function updateMessageCount() {
    const messageTextarea = document.getElementById("message");
    const messageCount = document.getElementById("message-count");
    const messageLength = messageTextarea.value.trim().length; // Trim whitespace before counting
    messageCount.textContent = messageLength;

    // Update color based on length
    messageCount.style.color = messageLength < 1 ? "red" : "green";
  }

  // Add event listeners to track input changes
  document
    .getElementById("fullName")
    .addEventListener("input", updateNameCount);
  document
    .getElementById("message")
    .addEventListener("input", updateMessageCount);

  // Initial update of character count
  updateNameCount();
  updateMessageCount();

  // JavaScript to handle the button click and toggle state
  const container = document.getElementById("sidebar-btn-container");
  const mainContainer = document.getElementById("sidebar-layout");
  const secondContainer = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleButton");
  const sideTexts = document.getElementsByClassName("sidebar-text");
  const sideContents = document.getElementById("sidebar-content");

  // sidebar items
  const sidebarOverview = document.getElementById("sidebar-overview");
  const sidebarServices = document.getElementById("sidebar-services");
  const sidebarBenefits = document.getElementById("sidebar-benefits");
  const sidebarGithub = document.getElementById("sidebar-github");
  const sidebarContact = document.getElementById("sidebar-contact");

  let expanded = false;

  toggleButton.addEventListener("click", () => {
    if (!expanded) {
      // expanding the sidebar
      expanded = true;
      container.style.removeProperty("width");
      mainContainer.style.width = "11rem";
      secondContainer.style.width = "inherit";
      sideContents.style.width = "auto";
      sideContents.style.height = "100%";
      sideContents.style.overflow = "visible";
      container.classList.add("relative");
      for (let i = 0; i < sideTexts.length; i++) {
        sideTexts[i].style.width = "auto";
        sideTexts[i].style.height = "auto";
      }

      // remove the sidebar items z-index-0
      sidebarOverview.classList.remove("z-0");
      sidebarServices.classList.remove("z-0");
      sidebarBenefits.classList.remove("z-0");
      sidebarGithub.classList.remove("z-0");
      sidebarContact.classList.remove("z-0");
    } else {
      expanded = false;
      for (let i = 0; i < sideTexts.length; i++) {
        sideTexts[i].style.width = "0rem";
        sideTexts[i].style.height = "0rem";
      }

      container.classList.remove("relative");
      if (window.innerWidth < 800) {
        // Additional handling for small screens
        sideContents.style.overflow = "hidden";
        container.style.removeProperty("width");
        mainContainer.style.removeProperty("width");
        secondContainer.style.removeProperty("width");

        // give the sidebar items z-index-0
        sidebarOverview.classList.add("z-0");
        sidebarServices.classList.add("z-0");
        sidebarBenefits.classList.add("z-0");
        sidebarGithub.classList.add("z-0");
        sidebarContact.classList.add("z-0");
      } else {
        container.style.width = "2rem";
        mainContainer.style.width = "4rem";
        secondContainer.style.width = "3.5rem";
      }
    }
  });

  // collapse the sidebar when user presses/clicks outside the sidebar. for screens less than 800px
  const mainDiv = document.getElementById("mainDiv");

  mainDiv.addEventListener("click", () => {
    if (window.innerWidth < 800) {
      expanded = false;
      for (let i = 0; i < sideTexts.length; i++) {
        sideTexts[i].style.width = "0rem";
        sideTexts[i].style.height = "0rem";
      }

      container.classList.remove("relative");
      // Additional handling for small screens
      sideContents.style.overflow = "hidden";
      container.style.removeProperty("width");
      mainContainer.style.removeProperty("width");
      secondContainer.style.removeProperty("width");
    }
  });

  // services containers
  const container1 = document.getElementById("web-development");
  const container2 = document.getElementById("mobile-development");
  const container3 = document.getElementById("networking");
  const container4 = document.getElementById("it-support");

  // functions to be called each time a user scrolls
  function handleScroll() {
    const rect1 = container1.getBoundingClientRect();
    const rect2 = container2.getBoundingClientRect();
    const rect3 = container3.getBoundingClientRect();
    const rect4 = container4.getBoundingClientRect();

    // ref for benefits cards
    const cardContainers = document.querySelectorAll(
      ".benefits-card-container"
    );

    // ref for the review form
    const contactContainer = document.getElementById("review");

    cardContainers.forEach((container, index) => {
      const rectCard = container.getBoundingClientRect();
      if (rectCard.top < window.innerHeight - 120) {
        container.classList.add("visible");
      } else {
        container.classList.remove("visible");
      }
    });

    const rectReview = contactContainer.getBoundingClientRect();
    if (rectReview.top <= 250) {
      // Perform action when the container is in view
      console.log("Review section is in view");
    }

    // Check visibility and apply animations
    if (rect1.bottom < 150 || window.innerHeight - rect1.top <= 150) {
      // fade out
      container1.classList.remove("fade-in");
      container1.classList.add("fade-out-right");
    } else {
      // fade in
      container1.classList.add("fade-in");
      container1.classList.remove("fade-out-right");
    }

    if (rect2.bottom < 150 || window.innerHeight - rect2.top <= 150) {
      // fade out
      container2.classList.remove("fade-in");
      container2.classList.add("fade-out-left");
    } else {
      // fade in
      container2.classList.add("fade-in");
      container2.classList.remove("fade-out-left");
    }

    if (rect3.bottom < 150 || window.innerHeight - rect3.top <= 150) {
      // fade out
      container3.classList.remove("fade-in");
      container3.classList.add("fade-out-up");
    } else {
      // fade in
      container3.classList.add("fade-in");
      container3.classList.remove("fade-out-up");
    }

    if (rect4.bottom < 150 || window.innerHeight - rect4.top <= 150) {
      // fade out
      container4.classList.remove("fade-in");
      container4.classList.add("fade-out-down");
    } else {
      // fade in
      container4.classList.add("fade-in");
      container4.classList.remove("fade-out-down");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger initial check

  // Function to add the hover-fade-in class
  function addHoverClass(event) {
    if (!expanded) {
      const hoverText = event.currentTarget.querySelector(".hover-text");
      if (hoverText) {
        hoverText.classList.add("hover-fade-in");
      }
    }
  }

  // Function to remove the hover-fade-in class
  function removeHoverClass(event) {
    const hoverText = event.currentTarget.querySelector(".hover-text");
    if (hoverText) {
      hoverText.classList.remove("hover-fade-in");
    }
  }

  // Get all sidebar items
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  // Add event listeners to each sidebar item
  sidebarItems.forEach((item) => {
    item.addEventListener("mouseover", addHoverClass);
    item.addEventListener("mouseout", removeHoverClass);
  });
});
