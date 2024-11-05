
  export default function getTokenFromHeaders(req: any) {
  
    
    return req.headers.authorization as string;
  }
  