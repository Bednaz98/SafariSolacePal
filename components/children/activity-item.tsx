import { Activity } from "../../classes-interfaces/activity";
import BasicModal from "../../SafariSolaceStyleTools/basicmodal";
import BasicText from "../../SafariSolaceStyleTools/basictext";
import GetStyle from "../../SafariSolaceStyleTools/get-style";

export default function ActivityItem(props: Activity){

    const {title, desc, startTime, endTime, location, status} = props;

    function renderPage(){
        return(<>
            <BasicText style={GetStyle("BasicText")} text={`Title: ${title}`}/>
            <BasicText style={GetStyle("BasicText")}text={`Description: ${desc}`}/>
            <BasicText style={GetStyle("BasicText")}text={`Start Time: ${new Date(startTime * 1000).toDateString()} At: ${new Date(startTime * 1000).toLocaleTimeString()}`}/>
            <BasicText style={GetStyle("BasicText")}text={`End Time: ${new Date((endTime + 604800) * 1000).toDateString()} At: ${new Date((endTime + 604800) * 1000).toLocaleTimeString()}`}/>
            <BasicText style={GetStyle("BasicText")}text={`Location: ${location}`}/>
            <BasicText style={GetStyle("BasicText")}text={`Status: ${status}`}/>
        </>)
    }

    return(<>
        <BasicModal child={renderPage()} openTitle={title}/>
    </>)
}