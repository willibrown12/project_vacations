import { FollowType,  } from './service';
import VacationCard from './vacationCard';



export type vacationCardUI = {
    
    id: number;
    country: string;
    city: string;
    description: string;
    start_date: Date;
    end_date: Date;
    price: number,
    followers_count:number
    image_url: string
    isFollowed:boolean
  
  
  }
  


export default function VacationsList(props: { vacations:Array<vacationCardUI>, doSomething?: (p: vacationCardUI) => void, usersFollow: Array<FollowType> , doSomethingAdmin?: (p: vacationCardUI) => void}) {
        if (!Array.isArray(props.vacations)) return <h2> No Data!</h2>
        return props.vacations.map((v) => {
          // @ts-ignore
            v.isFollowed = followFilter(v.id,props.usersFollow);
             // @ts-ignore
            return <VacationCard key={v.id } {...v} doSomething={props.doSomething} doSomethingAdmin={props.doSomethingAdmin}/>
        })
    }


    function followFilter(id:number,followArray: Array<FollowType>){

        const isFollowed = followArray.filter((follow) => follow.idlocation === id)
      
        
        return isFollowed.length > 0;


    }