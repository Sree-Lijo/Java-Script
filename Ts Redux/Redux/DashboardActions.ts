import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/profiles";
import "@pnp/sp/items";
import "@pnp/sp/items/list";


const CountryAll = (props: any) => {

    const sp: any = spfi().using(SPFx(props.context));
    return async (dispatch: any) => {

        try {

            const allCountry = await sp.web.lists.getByTitle("CountryMaster").items();
            dispatch({ type: "All_Country", payload: allCountry });

        } catch (err) {
            console.log(err)
        }
    }
}


const Actions = {
    CountryAll
}
export default Actions;

/* 
import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/list";

export const fetchAllItemsFromList = async (context: any): Promise<any[]> => {
    try {
        // Create a PnPJS SPFx instance
        const sp = spfi().using(SPFx(context));

        let allItems: any[] = [];
        let pageSize = 5000; // Set page size as needed
        let nextPage: any = null;

        do {
            const response = await sp.web.lists.getByTitle("CountryMaster").items
                .select("Title", "Id", "Created", "Modified") // Adjust fields as necessary
                //.top(pageSize)
                //.skip(allItems.length)
                ();

            allItems = [...allItems, ...response];

            // Check if there are more items to fetch (e.g., by checking length)
            nextPage = response.length === pageSize ? true : false;

        } while (nextPage);

        console.log(allItems);

        return allItems;

    } catch (error) {
        console.error("Error fetching items: ", error);
        throw error;
    }
};

const Actions = {
    fetchAllItemsFromList
}
export default Actions; 
 */