# Ad Analytics Project

This project is a web application for managing and analyzing advertisements. It includes features for displaying ads, tracking clicks, and calculating click-through rates (CTR).

## Technologies Used

- TypeScript
- Next.js
- React
- Prisma
- SQL
- npm

## Project Structure

- `pages/`: Contains the Next.js pages and API routes.
  - `index.tsx`: The home page that displays ads.
  - `api/ads/index.ts`: API route to fetch all ads.
  - `api/analytics/ctr.ts`: API route to calculate and fetch CTR data.
  - `api/analytics/daily.ts`: API route to fetch daily analytics data.
- `lib/`: Contains utility files.
  - `prisma.ts`: Prisma client setup.
- `styles/`: Contains global styles.
  - `globals.css`: Global CSS file.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
  - Configure your database connection in the `.env` file.
  - Run Prisma migrations:
    ```bash
    npx prisma migrate dev
    ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Fetch All Ads

- **URL:** `/api/ads`
- **Method:** `GET`
- **Response:** JSON array of ads.

### Fetch CTR Data

- **URL:** `/api/analytics/ctr`
- **Method:** `GET`
- **Query Parameters:**
  - `date` (optional): Date to filter analytics data.
- **Response:** JSON array of CTR data.

### Fetch Daily Analytics Data

- **URL:** `/api/analytics/daily`
- **Method:** `GET`
- **Query Parameters:**
  - `date`: Date to filter analytics data.
- **Response:** JSON array of daily analytics data.

## Usage

1. Open the home page to view all ads.
2. Click on an ad to track the click event.
3. Use the API endpoints to fetch analytics and CTR data.

## License

This project is licensed under the MIT License.

## References

For more information, refer to [this article](https://medium.com/@dorangao/building-a-simple-ads-engine-pilot-using-next-js-and-postgresql-db365f646688).