# HotSpots
## Inspiration
Inspired by the untapped potential of INRIX's APIs, we envisioned a tool that could transform traffic data into powerful market intelligence. We saw an opportunity to leverage this information to streamline site selection, enhance competitive strategies, and deliver cost-effective solutions. Our ambition was to craft a platform that would not just guide businesses geographically but also empower them with a decisive edge in market expansion. This vision propelled us to create a practical, innovative tool poised to redefine the approach to growth planning and location analytics.

## What it does
HotSpot is a dynamic location intelligence platform offering a suite of analytical tools for businesses. It provides virtual tours using Google Maps' street view, allowing clients to virtually experience potential new sites for their operations. By integrating advanced trips and parking data from INRIX, HotSpot offers insights into human mobility patterns, helping to determine optimal locations based on real-world flow and congestion patterns.

## How we built it
Using Node.js on the backend, we used Google Map’s API to get locations and the INRIX Drive Time Polygon API and React + Deck.gl on the frontend to visualize the area from a specific coordinate. Then we used datafiniti to get real-time real estate data. By considering available listings, we gave each location a score based on increased coverage and how many people traveled past it.

## Challenges we ran into
One of the primary challenges in developing HotSpot was building the suggestion model. To interpret mobility data into human congestion patterns isn't intuitive, and we wish we could've spent more time fine-tuning to have better predictions.

Another hiccup we faced was achieving a seamless integration of INRIX traffic data with Google Maps' visual capabilities. This process involved navigating the limitations and constraints of both APIs to create a cohesive experience and efficiently processing and interpreting large datasets from INRIX for meaningful insights without performance lags. We eventually were able to overcome these challenges and created a polished product.

Despite an extensive planning stage, we ran into issues when calculating the areas of polygons. To iterate over real estate locations, generate polygons and compute areas is computation heavy and slowed our execution times down.

## Accomplishments that we're proud of
Providing customers with useful store location suggestions is no small feat. Companies spend millions of dollars to decide, and for us to have developed an algorithm in 24 hours that can do something similar is special. Fully connecting both our Google Map’s API with the INRIX Drive Time Polygon API which allowed us to seamlessly integrate polygons at locations without performance lag. It allowed us to generate accurate visualizations and analysis of those visuals.

We are also very proud of our teamwork and collaboration as we could not have excelled without proper preparation and delegation of roles. Before coding, we sat down and discussed the potential of our idea and what other features were necessary to produce a viable product to display. By creating checkpoints and delegating roles, it allowed us to complete mini milestones that kept morale high and kept everyone up to date.

## What we learned
1. Using Git & Github Desktop
1. React.JS and various libraries
1. Using Google Maps API
1. Data cleaning & filtering
1. Integrating Deck GL
## What's next for HotSpots
1. Improving the suggestion model with more data
1. Detailed explanations of scores
1. Machine learning model?
1. Improving the heat map
1. Testing custom locations to ratify human suggestions
