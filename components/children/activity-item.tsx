import BasicModal from "../../SafariSolaceStyleTools/basicmodal";
import BasicText from "../../SafariSolaceStyleTools/basictext";

export default function ActivityItem(props: Activity){

    const {title, desc, startTime, endTime, location, status} = props;

    function renderPage(){
        return(<>
            <BasicText text={`Title: ${title}`}/>
            <BasicText text={`Description: ${desc}`}/>
            <BasicText text={`Start Time: ${new Date(startTime * 1000)}`}/>
            <BasicText text={`End Time: ${new Date((endTime + 604800) * 1000)}`}/>
            <BasicText text={`Location: ${location}`}/>
            <BasicText text={`Status: ${status}`}/>
        </>)
    }

    return(<>
        <BasicModal child={renderPage()} openTitle={title}/>
    </>)
}