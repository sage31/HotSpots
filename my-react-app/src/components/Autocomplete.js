import React, { useState } from "react";

const locations = [
  "Walmart",
  "Amazon.com",
  "Exxon Mobil",
  "Apple",
  "UnitedHealth Group",
  "CVS Health",
  "Berkshire Hathaway",
  "Alphabet",
  "McKesson",
  "Chevron",
  "AmerisourceBergen",
  "Costco Wholesale",
  "Microsoft",
  "Cardinal Health",
  "Cigna Group",
  "Marathon Petroleum",
  "Phillips 66",
  "Valero Energy",
  "Ford Motor",
  "Home Depot",
  "General Motors",
  "Elevance Health",
  "JPMorgan Chase",
  "Kroger",
  "Centene",
  "Verizon Communications",
  "Walgreens Boots Alliance",
  "Fannie Mae",
  "Comcast",
  "AT&T",
  "Meta Platforms",
  "Bank of America",
  "Target",
  "Dell Technologies",
  "Archer Daniels Midland",
  "Citigroup",
  "United Parcel Service",
  "Pfizer",
  "Lowe's",
  "Johnson & Johnson",
  "FedEx",
  "Humana",
  "Energy Transfer",
  "State Farm Insurance",
  "Freddie Mac",
  "PepsiCo",
  "Wells Fargo",
  "Walt Disney",
  "ConocoPhillips",
  "Tesla",
  "Procter & Gamble",
  "General Electric",
  "Albertsons",
  "MetLife",
  "Goldman Sachs Group",
  "Sysco",
  "Raytheon Technologies",
  "Boeing",
  "StoneX Group",
  "Lockheed Martin",
  "Morgan Stanley",
  "Intel",
  "HP",
  "TD Synnex",
  "International Business Machines",
  "HCA Healthcare",
  "Prudential Financial",
  "Caterpillar",
  "Merck",
  "World Fuel Services",
  "New York Life Insurance",
  "Enterprise Products Partners",
  "AbbVie",
  "Plains GP Holdings",
  "Dow",
  "American International Group",
  "American Express",
  "Publix Super Markets",
  "Charter Communications",
  "Tyson Foods",
  "Deere",
  "Cisco Systems",
  "Nationwide",
  "Allstate",
  "Delta Air Lines",
  "Liberty Mutual Insurance Group",
  "TJX",
  "Progressive",
  "American Airlines Group",
  "CHS",
  "Performance Food Group",
  "PBF Energy",
  "Nike",
  "Best Buy",
  "Bristol-Myers Squibb",
  "United Airlines Holdings",
  "Thermo Fisher Scientific",
  "Qualcomm",
  "Abbott Laboratories",
  "Coca-Cola",
  "Oracle",
  "Nucor",
  "TIAA",
  "Massachusetts Mutual Life Insurance",
  "General Dynamics",
  "Capital One Financial",
  "HF Sinclair",
  "Dollar General",
  "Arrow Electronics",
  "Occidental Petroleum",
  "Northwestern Mutual",
  "Travelers",
  "Northrop Grumman",
  "United Services Automobile Assn.",
  "Honeywell International",
  "3M",
  "US Foods Holding",
  "Warner Bros. Discovery",
  "Lennar",
  "D.R. Horton",
  "Jabil",
  "Cheniere Energy",
  "Broadcom",
  "CarMax",
  "Starbucks",
  "Molina Healthcare",
  "Uber Technologies",
  "Philip Morris International",
  "Netflix",
  "NRG Energy",
  "Mondelez International",
  "Danaher",
  "Salesforce",
  "Paramount Global",
  "CBRE Group",
  "Micron Technology",
  "Visa",
  "Southern",
  "United Natural Foods",
  "Paccar",
  "Duke Energy",
  "Eli Lilly",
  "Hewlett Packard Enterprise",
  "Dollar Tree",
  "Lithia Motors",
  "Cummins",
  "Penske Automotive Group",
  "PayPal Holdings",
  "U.S. Bancorp",
  "Gilead Sciences",
  "AutoNation",
  "Nvidia",
  "Kraft Heinz",
  "Amgen",
  "Applied Materials",
  "EOG Resources",
  "Truist Financial",
  "Macy's",
  "Union Pacific",
  "C.H. Robinson Worldwide",
  "Rite Aid",
  "Constellation Energy",
  "Avnet",
  "Pioneer Natural Resources",
  "Southwest Airlines",
  "CDW",
  "Advanced Micro Devices",
  "PNC Financial Services Group",
  "McDonald's",
  "Cleveland-Cliffs",
  "Freeport-McMoRan",
  "Builders FirstSource",
  "Oneok",
  "Hartford Financial Services Group",
  "Charles Schwab",
  "Steel Dynamics",
  "Mastercard",
  "Sherwin-Williams",
  "Genuine Parts",
  "PG&E",
  "WESCO International",
  "Murphy USA",
  "WestRock",
  "International Paper",
  "Baker Hughes",
  "United States Steel",
  "NextEra Energy",
  "Targa Resources",
  "Lear",
  "Jones Lang LaSalle",
  "Goodyear Tire & Rubber",
  "Marriott International",
  "Marsh & McLennan",
  "Altria Group",
  "Coupang",
  "Carrier Global",
  "Halliburton",
  "Delek US Holdings",
  "Kimberly-Clark",
  "Texas Instruments",
  "Bank of New York Mellon",
  "ManpowerGroup",
  "Whirlpool",
  "Waste Management",
  "American Electric Power",
  "Emerson Electric",
  "Aflac",
  "Cognizant Technology Solutions",
  "Becton Dickinson",
  "BJ's Wholesale Club",
  "Moderna",
  "DTE Energy",
  "Land O'Lakes",
  "Kinder Morgan",
  "Tenet Healthcare",
  "Devon Energy",
  "Mosaic",
  "Exelon",
  "General Mills",
  "Global Partners",
  "Western Digital",
  "Lincoln National",
  "Ross Stores",
  "Stryker",
  "Kyndryl Holdings",
  "Kohl's",
  "Stanley Black & Decker",
  "Colgate-Palmolive",
  "BlackRock",
  "Fiserv",
  "Estée Lauder",
  "PPG Industries",
  "Adobe",
  "Block",
  "Synchrony Financial",
  "Principal Financial",
  "Lumen Technologies",
  "Corteva",
  "Andersons",
  "Lam Research",
  "Edison International",
  "Dominion Energy",
  "Booking Holdings",
  "Quanta Services",
  "Expeditors International of Washington",
  "L3Harris Technologies",
  "Reliance Steel & Aluminum",
  "Live Nation Entertainment",
  "DISH Network",
  "DuPont",
  "Automatic Data Processing",
  "Group 1 Automotive",
  "Aramark",
  "Thor Industries",
  "DXC Technology",
  "Viatris",
  "Reinsurance Group of America",
  "AutoZone",
  "PulteGroup",
  "Illinois Tool Works",
  "Parker-Hannifin",
  "BorgWarner",
  "Westlake",
  "Consolidated Edison",
  "Gap",
  "Opendoor Technologies",
  "Nordstrom",
  "Asbury Automotive Group",
  "Ball",
  "Kellogg",
  "Xcel Energy",
  "W.W. Grainger",
  "Discover Financial Services",
  "Baxter International",
  "Southwestern Energy",
  "DCP Midstream",
  "Jacobs Solutions",
  "Laboratory Corp. of America",
  "CSX",
  "J.B. Hunt Transport Services",
  "Guardian Life Ins. Co. of America",
  "Jackson Financial",
  "Fidelity National Information Services",
  "Berry Global Group",
  "Sempra",
  "IQVIA Holdings",
  "O'Reilly Automotive",
  "Leidos Holdings",
  "Ameriprise Financial",
  "Omnicom Group",
  "Tractor Supply",
  "Corning",
  "Ecolab",
  "Icahn Enterprises",
  "Farmers Insurance Exchange",
  "Keurig Dr Pepper",
  "Loews",
  "Equitable Holdings",
  "Sonic Automotive",
  "Fox",
  "American Family Insurance Group",
  "Entergy",
  "Fluor",
  "Vistra",
  "State Street",
  "Otis Worldwide",
  "Peter Kiewit Sons'",
  "Carvana",
  "Republic Services",
  "AECOM",
  "Universal Health Services",
  "Pacific Life",
  "VMware",
  "Western & Southern Financial Group",
  "MGM Resorts International",
  "Casey's General Stores",
  "Crown Holdings",
  "Textron",
  "LKQ",
  "Norfolk Southern",
  "Intuit",
  "Air Products & Chemicals",
  "Boston Scientific",
  "AGCO",
  "Henry Schein",
  "Amphenol",
  "AES",
  "Mutual of Omaha Insurance",
  "Ovintiv",
  "Hormel Foods",
  "Alcoa",
  "International Flavors & Fragrances",
  "Jones Financial (Edward Jones)",
  "Dick's Sporting Goods",
  "Eversource Energy",
  "Wayfair",
  "Community Health Systems",
  "Ally Financial",
  "Regeneron Pharmaceuticals",
  "Liberty Media",
  "APA",
  "Qurate Retail",
  "FirstEnergy",
  "Analog Devices",
  "Ryder System",
  "Avis Budget Group",
  "Unum Group",
  "Newmont",
  "VF",
  "Chesapeake Energy",
  "Mohawk Industries",
  "Markel",
  "Expedia Group",
  "Caesars Entertainment",
  "United Rentals",
  "Apollo Global Management",
  "DaVita",
  "Hess",
  "Fidelity National Financial",
  "Conagra Brands",
  "Univar Solutions",
  "Auto-Owners Insurance",
  "Raymond James Financial",
  "Seaboard",
  "CF Industries Holdings",
  "S&P Global",
  "W.R. Berkley",
  "Advance Auto Parts",
  "EMCOR Group",
  "Williams",
  "Interpublic Group",
  "TravelCenters of America",
  "American Tower",
  "Molson Coors Beverage",
  "Huntington Ingalls Industries",
  "NVR",
  "Eastman Chemical",
  "Graybar Electric",
  "Insight Enterprises",
  "Hershey",
  "News Corp.",
  "Toll Brothers",
  "Ulta Beauty",
  "Assurant",
  "Weyerhaeuser",
  "Biogen",
  "Dana",
  "UGI",
  "Chewy",
  "Owens & Minor",
  "Quest Diagnostics",
  "Public Service Enterprise Group",
  "Ebay",
  "MasTec",
  "Owens Corning",
  "Celanese",
  "Altice USA",
  "Alaska Air Group",
  "SpartanNash",
  "Diamondback Energy",
  "Intercontinental Exchange",
  "Darden Restaurants",
  "UFP Industries",
  "WEC Energy Group",
  "Yum China Holdings",
  "EnLink Midstream",
  "Continental Resources",
  "Newell Brands",
  "Graphic Packaging Holding",
  "Olin",
  "Fifth Third Bancorp",
  "Thrivent Financial for Lutherans",
  "CenterPoint Energy",
  "Erie Insurance Group",
  "CommScope Holding",
  "KLA",
  "JetBlue Airways",
  "Motorola Solutions",
  "Citizens Financial Group",
  "Coterra Energy",
  "Avery Dennison",
  "PVH",
  "GXO Logistics",
  "Polaris",
  "Global Payments",
  "Arconic",
  "Vertex Pharmaceuticals",
  "Commercial Metals",
  "Autoliv",
  "Constellation Brands",
  "Hilton Worldwide Holdings",
  "Foot Locker",
  "Huntsman",
  "Burlington Stores",
  "Hertz Global Holdings",
  "Masco",
  "Williams-Sonoma",
  "Chipotle Mexican Grill",
  "M&T Bank",
  "LPL Financial Holdings",
  "CMS Energy",
  "Campbell Soup",
  "Arthur J. Gallagher",
  "Blackstone",
  "Dover",
  "ODP",
  "Packaging Corp. of America",
  "Brighthouse Financial",
  "Beacon Roofing Supply",
  "Airbnb",
  "Boise Cascade",
  "Booz Allen Hamilton Holding",
  "Westinghouse Air Brake Technologies",
  "ON Semiconductor",
  "Oshkosh",
  "Franklin Resources",
  "Taylor Morrison Home",
  "A-Mark Precious Metals",
  "KeyCorp",
  "ARKO",
  "Lululemon athletica",
  "Old Republic International",
  "Zoetis",
  "Marathon Oil",
  "J.M. Smucker",
  "Huntington Bancshares",
  "NGL Energy Partners",
  "Ingredion",
  "Fortune Brands Innovations",
  "PPL",
  "Sanmina",
  "Bed Bath & Beyond",
  "Cintas",
  "NCR",
  "ABM Industries",
  "Rockwell Automation",
  "Northern Trust",
  "XPO",
  "Science Applications International",
  "Ameren",
  "First American Financial",
  "Bath & Body Works",
  "Regions Financial",
  "Activision Blizzard",
  "Avantor",
  "Genworth Financial",
  "EQT",
  "Skechers U.S.A.",
  "Landstar System",
  "Knight-Swift Transportation Holdings",
  "SVB Financial Group",
  "Par Pacific Holdings",
  "Albemarle",
  "Vulcan Materials",
  "Watsco",
  "KKR",
  "Equinix",
  "Sonoco Products",
  "ServiceNow",
  "Robert Half International", // Add more locations as needed
];

const Autocomplete = ({ onSelect }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (input) => {
    setValue(input);

    if (input.trim() !== "") {
      const newSuggestions = locations.filter((location) =>
        location.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(newSuggestions.slice(0, 4)); // Limit to 4 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (selectedLocation) => {
    setValue(selectedLocation);
    onSelect(selectedLocation);
    setSuggestions([]);
  };

  return (
    <div className="flex justify-center mt-3">
      <input
        type="text"
        className="search-bar text-center p-1 rounded ml-2 bg-gray-100"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search a business"
      />
      {suggestions.length > 0 && (
        <div className="rounded suggestions-list z-50 fixed flex items-center justify-center bg-gray-100">
          <ul className="">
            {suggestions.map((location, index) => (
              <li
                //className=" ml-3 w-60 text-center bg-gray-300"
                //className="absolute z-50 inset-0 bg-gray-300 bg-opacity-40"
                key={index}
                onClick={() => handleSelect(location)}
                className="suggestion-item"
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
