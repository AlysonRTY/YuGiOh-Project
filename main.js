// Global ------------------------------------------------------------------------------------------

const data = response.data
// console.log(data);
const yugiohCards = data


// ------------------------------------------------------------------------------------------


// document.getElementByID------------------------------------------------------------------------------------------------------------------------


const datalist = document.getElementById("datalistOptions");
const exampleDataList = document.getElementById("exampleDataList");
const searchButton = document.getElementById("searchButton");
const cardImage = document.getElementById("cardImage");
const cardType = document.getElementById("cardType");
const cardAttribute = document.getElementById("cardAttribute");
const cardLevel = document.getElementById("cardLevel");
const cardDisplay = document.getElementById('cardDisplay');
const cardNotFoundMessage = document.getElementById('cardNotFoundMessage');

// ------------------------------------------------------------------------------------------------------------------------
// Searchbar (input field)-------------------------------------------------------------------------------------------

yugiohCards.forEach(yugiohCard => {
    const option = document.createElement("option");
    option.value = yugiohCard.name;
    datalist.appendChild(option);
});


// ------------------------------------------------------------------------------------------


const allAttributes = yugiohCards.map(card => card.attribute)//creates an array of all attribute values from the yugiohCards array
  .filter(attribute => attribute !== undefined);
    // console.log('allAttributes :>> ', allAttributes); could be done in 1 filter function!!!!!!

const uniqueAttributes = [...new Set(allAttributes)]; //creates a Set of unique attributes (since Set automatically removes duplicates)
//converts the Set back into an array using the spread operator (...)
// console.log(uniqueAttributes);

uniqueAttributes.forEach(attribute => {
  const optionElement = document.createElement("option");
  optionElement.value = attribute; // The value sent when the form is submitted
  optionElement.textContent = attribute; // The text displayed in the dropdown

  cardAttribute.appendChild(optionElement);
});




const allLevels = yugiohCards.map(card => card.level) 
    .filter(level => level !== undefined);

const uniqueLevels = [...new Set(allLevels)]; //create a collection of unique levels, then convert it back to an array

const sortedUniqueLevels = uniqueLevels.sort((a, b) => a - b);  //sort the level from low to high

// console.log('Unique Levels:', sortedUniqueLevels);

sortedUniqueLevels.forEach(level => {
    const optionElement = document.createElement("option");
    optionElement.value = level;
    optionElement.textContent = level;
    cardLevel.appendChild(optionElement);
})



const allTypes = yugiohCards.map(card => card.type);
const uniqueTypes = allTypes.filter((type, index, self) => self.indexOf(type) === index);

// console.log(uniqueTypes);

uniqueTypes.forEach(type => {
    const optionElement = document.createElement("option");
    optionElement.value = type;
    optionElement.textContent = type;
    cardType.appendChild(optionElement);
})


// ----------------------------------------------------------------------
// 
// Combined Filters FUNCITON LETS GO_!!!!-------------------------------------------------------

window.addEventListener('load', () => {
  cardNotFoundMessage.style.display = 'none';
});
const filterCardsByProperties = (filters) => {
  return yugiohCards.filter(card => {
    return (
      (!filters.attribute || card.attribute === filters.attribute) &&
      (!filters.type || card.type === filters.type) &&
      (!filters.level || card.level === Number(filters.level)) //The filters.level value is converted to a number using Number() because the filter value from the input field is a string, while the cards level is a number.
    );
  });
};

const displayCards = (cards) => {
  if (cards.length === 0) {
    cardNotFoundMessage.style.display = 'block'; // Show "No cards found" message
  } else {
    cardNotFoundMessage.style.display = 'none'; // Hide the message

    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';

      if (card.card_images && card.card_images.length > 0) {
        const cardImage = document.createElement('img');
        cardImage.src = card.card_images[0].image_url;
        cardImage.alt = card.name;
        cardElement.appendChild(cardImage);
      }
      cardDisplay.appendChild(cardElement);
    });
  }
};

const applyFilters = () => {
  cardDisplay.innerHTML = '';
  const selectedAttribute = cardAttribute.value;
  const selectedType = cardType.value;
  const selectedLevel = cardLevel.value;
  const searchTerm = exampleDataList.value.trim().toLowerCase();

  const filters = {
    attribute: selectedAttribute,
    type: selectedType,
    level: selectedLevel
  };

  let filteredCards = filterCardsByProperties(filters);

  // Filter by card name if a search term is provided
  if (searchTerm) {
    filteredCards = filteredCards.filter(card =>
      card.name.toLowerCase().includes(searchTerm)
    );
  }
  displayCards(filteredCards);
};

const resetFilters = () => {
  cardAttribute.value = '';
  cardType.value = '';
  cardLevel.value = '';
  exampleDataList.value = '';

  // Clear the card display and hide the "No cards found" message
  cardDisplay.innerHTML = '';
  cardNotFoundMessage.style.display = 'none';
};

searchButton.addEventListener('click', applyFilters);

resetButton.addEventListener('click', resetFilters);