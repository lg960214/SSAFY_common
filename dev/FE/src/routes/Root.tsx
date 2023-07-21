import '@/routes/root.css';

export default function Root() {
  return (
    <>
      <nav className="flex justify-between navbar mx-auto">
        <p className="text-white fontBungee whitespace-pre-line ms-4 mt-1">
          <span className="text-5xl tracking-widest">WAIT</span> <br />{' '}
          <span className="text-4xl">WEIGHT</span>
        </p>
        <ul className="flex text-right me-5">
          <li className="navmenu my-auto mx-4">
            <a className="text-white text-xl" href={`/Main`}>
              회원 관리
            </a>
          </li>
          <li className="navmenu my-auto mx-4">
            <a className="text-white text-xl" href={`/contacts/2`}>
              기구 관리
            </a>
          </li>
          <li className="navmenu my-auto mx-4">
            <a className="text-white text-xl" href={`/contacts/2`}>
              이용 현황
            </a>
          </li>
          <li className="navmenu my-auto mx-4">
            <a className="text-white text-xl" href={`/contacts/2`}>
              대기 현황
            </a>
          </li>
        </ul>
      </nav>
      <div id="detail"></div>
    </>
  );
}
