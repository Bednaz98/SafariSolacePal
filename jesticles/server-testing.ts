import httpHandler, { httphandlerInterface } from "../classes-interfaces/http-handler"


async function test(){
    const handler: httphandlerInterface = new httpHandler(true)
    //GETTTING
    const getReservationsTest = await handler.getReservations('derp')
    console.log("🚀 ~ file: server-testing.ts ~ line 7 ~ getReservationsTest", getReservationsTest)

    const getActivitiesTest = await handler.getActivities()
    console.log("🚀 ~ file: server-testing.ts ~ line 10 ~ getActivitiesTest", getActivitiesTest)
    const getActivitiesByIDTest = await handler.getActivities('pingpong')
    console.log("🚀 ~ file: server-testing.ts ~ line 12 ~ getActivitiesByIDTest", getActivitiesByIDTest)

    const getRoomOfferingsTest = await handler.getRoomOfferings()
    console.log("🚀 ~ file: server-testing.ts ~ line 15 ~ getRoomOfferingsTest", getRoomOfferingsTest)
    const getRoomOfferingsByIDTest = await handler.getRoomOfferings('roomservice')
    console.log("🚀 ~ file: server-testing.ts ~ line 17 ~ getRoomOfferingsByIDTest", getRoomOfferingsByIDTest)

    const getRoomServiceRequestsTest = await handler.getRoomServiceRequests()
    console.log("🚀 ~ file: server-testing.ts ~ line 20 ~ getRoomServiceRequestsTest", getRoomServiceRequestsTest)
    const getRoomServiceRequestsByIDTest = await handler.getRoomServiceRequests('servicebyid')
    console.log("🚀 ~ file: server-testing.ts ~ line 22 ~ getRoomServiceRequestsByIDTest", getRoomServiceRequestsByIDTest)

}

test()







