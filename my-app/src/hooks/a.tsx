import { useRouter } from 'next/router';
import {FormEvent} from "react"
 
function ActiveLink({ children, href }: any) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  };
 
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    router.push(href);
  };
 
  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}
 
export default ActiveLink;