// Global Variables
let page = 1;

const formatDollar = (number, maximumSignificantDigits) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits
  }).format(number);

// Using Async/await
async function getDataAsync() {
  if(page===1){
    $("#previous-page").hide();

  }
  else
    $("#previous-page").show();
  // We empty the table
  $("#coins").empty();

  // Fetch data from coingecko
  let BASE_URL = "https://api.coingecko.com/api/v3";

  let COINS_DATA_PAGE1_ENDPOINT = `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&price_change_percentage=24h&sparkline=true`;

  let coinsDataPage1url = BASE_URL + COINS_DATA_PAGE1_ENDPOINT;

  // fetch data from coingecko API
  const res = await fetch(coinsDataPage1url);

  //Convert data from JSON format
  const data = await res.json();

  console.log(data);

  // Loop throught all the coins
  for (let i = 0; i < data.length; i++) {
    //Getting one coin data from array
    const tokenData = data[i];
    $("#coins").append(
      `<tr>
            <th scope="row">${tokenData.market_cap_rank}</th>
            <td>${tokenData.name}</td>
            <td>${tokenData.symbol.toUpperCase()}</td>
            <td>${formatDollar(tokenData.current_price)}</td>
            <td>${formatDollar(tokenData.market_cap)}</td>
        </tr>`
    );
  }
}

// Only executed one time when the app loads
getDataAsync(page);

// Event listener
$("#previous-page").click(function () {
  page--;
  getDataAsync();
});
$("#next-page").click(function () {
  page++;
  getDataAsync();
});
