1. Assuming the system currently has three microservices: Customer API, Master Data API,
   and Transaction Data API, there is a new feature that requires data from all three
   microservices to be displayed in near real-time. The current technology stack includes
   REST APIs and an RDBMS database. How would you design a new API for this feature?

Ans:

"For this new feature that needs data from three different microservices in near real-time, I'd build a service that collect data from three sources.
Here's how it would work:

1. Each of our three existing APIs (Customer, Master Data, and Transaction) would send out a message whenever their data changes. These messages go to a message broker like Kafka or RabbitMQ.
2. My new service would listen for these messages from all three sources.
   When a message comes in, my service would update a database that combines the relevant data from all three services.
3. I'd create a simple REST API that reads from this combined database whenever a client needs the data.

This way, the combined data is always up-to-date without having to make three separate API calls every time someone wants to see it. The data is already prepared and waiting, which makes it much faster for users.
This approach is similar to event listeners in JavaScript or the EventEmitter in NestJS, but it works across different services instead of just within one application."

2. Assuming the team has started planning a new project, the project manager asks you for a
   performance test strategy plan for this release. How would you recommend proceeding to
   the project manager?

Ans:

Before I make specific recommendations, I think I should first understand your requirements better.
I'd like to:

Understand your specific requirements for this project - what functionality needs performance testing and what are the priorities?
Clarify the performance metrics that matter most for this release - are we focusing on response time, throughput, concurrent users, or something else?
Determine your expectations - what performance targets do we need to hit to consider this release successful?
Identify key test scenarios that reflect real-world usage patterns our users will experience.

Once I understand these requirements, I can help recommend appropriate testing tools and approaches that would fit our needs and timeline.

3. Design and develop two APIs using NestJS and Postgres with the following
   specifications:

Ans:

Validation Approach
"I've implemented data validation using class-validator in my DTOs. This ensures:

All required fields are present
Data types are correct
String lengths are within limits
Language codes follow the proper format
Each product has at least one translation with no duplicates"

Database Design
"My database has two main tables:

Product: Contains core product data and default language
ProductTranslation: Stores name and description in multiple languages

This design allows adding new languages without changing the database structure and enables efficient language-based searching."

Testing Strategy
"My testing approach includes:

Unit tests: Testing individual components in isolation
Integration tests: Verifying components work together correctly
End-to-end tests: Testing complete user workflows

Tests will verify that:

Products can be created with translations
Search finds products in any language
Pagination works correctly
Error handling functions properly
