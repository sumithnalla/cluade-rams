Use an object map, not a separate directory.
Your site is already centralized through data/equipData.js and build.js, so the clean approach is to keep city-wise pricing inside each equipment item, keyed by the city slugs that already exist in data/cities.js:

{
  id: 1,
  name: "Tripod Screen",
  model: "Liberty projection screen",
  image: "/equipment/tripod screen.png",
  cityPricing: {
    hyderabad: { price: "1,199", extraPrice: "799" },
    mumbai: { price: "1,799", extraPrice: "1,199" },
    chennai: { price: "1,599", extraPrice: "999" },
    pune: { price: "1,399", extraPrice: "899" },
    bangalore: { price: "1,699", extraPrice: "1,099" }
  },
  bookedCount: 85,
  rating: 4.8
}

Then in build.js, inside equipCardHTML(item, citySlug), read the price like this:

const cityData = citySlug ? item.cityPricing?.[citySlug] : null;
const displayPrice = cityData?.price || item.price;

Then use displayPrice instead of item.price.
Important: use hyderabad, mumbai, chennai, pune, bangalore as keys, not hyd, because your current city slugs use the full names.
This is better than an array because lookup is direct: item.cityPricing[citySlug]. It is also better than making folders, because pricing is data, not page structure.
One small decision remains for non-city pages like the main equipment page:
Show a default/base price
Show Starting from ₹...
Hide exact price until city is selected
Starting from is usually the best option.