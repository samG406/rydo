import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    // Get userId from request headers (sent from client)
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    // Get user's home and work addresses
    const userAddresses = await sql`
      SELECT home_address, home_latitude, home_longitude, 
             work_address, work_latitude, work_longitude
      FROM users 
      WHERE clerk_id = ${userId}
    `;

    // Get recent searches (with error handling for missing table)
    let recentSearches: any[] = [];
    try {
      recentSearches = await sql`
        SELECT address, latitude, longitude
        FROM recent_searches 
        WHERE user_id = (SELECT id FROM users WHERE clerk_id = ${userId})
        ORDER BY id DESC 
        LIMIT 10
      `;
    } catch (error) {
      console.log("recent_searches table doesn't exist yet:", error);
    }

    // Get favorite locations (with error handling for missing table)
    let favoriteLocations: any[] = [];
    try {
      favoriteLocations = await sql`
        SELECT name, address, latitude, longitude, icon_type
        FROM favorite_locations 
        WHERE user_id = (SELECT id FROM users WHERE clerk_id = ${userId})
        ORDER BY id DESC
      `;
    } catch (error) {
      console.log("favorite_locations table doesn't exist yet:", error);
    }

    return Response.json({
      userAddresses: userAddresses[0] || {},
      recentSearches,
      favoriteLocations,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Get userId from request headers (sent from client)
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, address, latitude, longitude, name } = await request.json();
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Get user ID from clerk_id
    const userResult = await sql`
      SELECT id FROM users WHERE clerk_id = ${userId}
    `;

    if (!userResult[0]) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const userDbId = userResult[0].id;

    switch (type) {
      case "home":
        await sql`
          UPDATE users 
          SET home_address = ${address}, 
              home_latitude = ${latitude}, 
              home_longitude = ${longitude}
          WHERE clerk_id = ${userId}
        `;
        break;

      case "work":
        await sql`
          UPDATE users 
          SET work_address = ${address}, 
              work_latitude = ${latitude}, 
              work_longitude = ${longitude}
          WHERE clerk_id = ${userId}
        `;
        break;

      case "recent":
        // Add to recent searches
        try {
          await sql`
            INSERT INTO recent_searches (user_id, address, latitude, longitude)
            VALUES (${userDbId}, ${address}, ${latitude}, ${longitude})
          `;
        } catch (error) {
          console.log("recent_searches table doesn't exist yet:", error);
        }
        break;

      case "favorite":
        // Add to favorite locations
        try {
          await sql`
            INSERT INTO favorite_locations (user_id, name, address, latitude, longitude)
            VALUES (${userDbId}, ${name || address}, ${address}, ${latitude}, ${longitude})
          `;
        } catch (error) {
          console.log("favorite_locations table doesn't exist yet:", error);
        }
        break;

      default:
        return Response.json({ error: "Invalid type" }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error saving address:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Get userId from request headers (sent from client)
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    const sql = neon(`${process.env.DATABASE_URL}`);

    switch (type) {
      case "recent":
        await sql`
          DELETE FROM recent_searches 
          WHERE id = ${id} AND user_id = (SELECT id FROM users WHERE clerk_id = ${userId})
        `;
        break;

      case "favorite":
        await sql`
          DELETE FROM favorite_locations 
          WHERE id = ${id} AND user_id = (SELECT id FROM users WHERE clerk_id = ${userId})
        `;
        break;

      default:
        return Response.json({ error: "Invalid type" }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting address:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
