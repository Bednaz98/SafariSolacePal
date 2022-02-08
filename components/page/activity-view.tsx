import { ScrollView, View } from "react-native"
import ActivityItem from "../children/activity-item"

export default function ActivityView(){

    const activities: Activity[] = [
        {"id":"9d3411d2-8d2c-4813-b0ba-40eed59cf3cf","title":"Ice Cream Social","desc":"We all scream for ice cream!","startTime":1646772927,"endTime":1646772927,"location":"Pool","status":"On Schedule"},
        {"id":"27a521d4-ca4e-4906-a1a9-4ef975815e35","title":"Burger Buffet","desc":"Create your own burger.","startTime":1646772927,"endTime":1646772927,"location":"Roof Top","status":"On Schedule"},
        {"id":"34d4b13f-e400-4a99-9640-0f4b80777909","title":"Axe Throwing","desc":"Come chuck some axes.","startTime":1646772927,"endTime":1646772927,"location":"Beach","status":"On Schedule"}
    ]

    //const activities: Activity[] = [] //HTTP HANDLER
    const activityItems = activities.map(a => <ActivityItem key={a.id} {...a}/>)

    return(<View>
        <ScrollView>
                {activityItems}
        </ScrollView>
    </View>)
}