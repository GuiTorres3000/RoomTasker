import { Disclosure} from '@headlessui/react'
import { useLocation } from "react-router-dom";

const navigation = [
    { name: 'Seu Dashboard', href: '/dashboard', current: false },
    { name: 'Dashboard Global', href: '/dashboard/global', current: false },
  ];
  
  function classNames(...classes: any) { 
    return classes.filter(Boolean).join(" ");
  }
  
interface NavbarProps {
    userName: string; // Propriedade para receber o nome do usuário
}


export default function navbar({ userName }: NavbarProps) {

    // URL atual
    const location = useLocation(); 
    // Caminho atual
    const currentPath = location.pathname; 
    // Pegando o id do usuário
    const userId = currentPath.split('/')[2];

    return (
        <Disclosure as="nav" className="relative z-10 bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="RoomTasker"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                {navigation.map((item) => {
                  // Gerando a URL completa para o link
                  const href = item.href.includes('/dashboard')
                    ? `${item.href.startsWith('/dashboard/global') ? `/dashboard/${userId}/global` : `/dashboard/${userId}`}`
                    : item.href;

                  // Determinando se o item é o atual
                  const isCurrent = currentPath === href;

                  return (
                    <a
                      key={item.name}
                      href={href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={classNames(
                        isCurrent
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  );
                })}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <p className="text-gray-700 font-medium text-sm">
              Bem vindo, <span className="font-bold">{userName}</span>
            </p>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}