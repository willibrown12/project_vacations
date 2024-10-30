import { useEffect, useState } from "react"
import { homeCardUI, SendToApiVacations } from "./service"




export function Vacations() {




  const [homeCards, sethomeCards] = useState<Array<homeCardUI>>([])
      const [isLoading, setIsLoading] = useState(true)
    



    useEffect(() => {
        let isSetState = true
        async function tableStart() {
          try {
            setIsLoading(true)
            const result: any = await SendToApiVacations()
            if (isSetState) {
                sethomeCards(result)
                console.log(result);
                
           
            }
    
          } catch (error) {
            alert(error)
          } finally {
            setIsLoading(false)
          }
        }
        tableStart()
        return () => {
          isSetState = false;
        }
      }, [])
    
  

  return (
 <h1>hello</h1>
  );
}

