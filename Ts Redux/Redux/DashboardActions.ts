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
