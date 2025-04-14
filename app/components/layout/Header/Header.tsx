import Nav from './Nav/Nav';

export default function Header(){
  return (
    <header id='app-header' className='flex px-[200px] max-2xl:px-[50px] max-lg:px-[16px] container relative'>
      <Nav/>
    </header>
  );
};
