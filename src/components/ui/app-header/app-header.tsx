import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              display: 'flex',
              color: isActive('/') ? 'white' : 'gray'
            }}
          >
            <BurgerIcon type={isActive('/') ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            to='/feed'
            style={{
              textDecoration: 'none',
              display: 'flex',
              color: isActive('/feed') ? 'white' : 'gray'
            }}
          >
            <ListIcon type={isActive('/feed') ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex'
            }}
          >
            <Logo className='' />
          </Link>
        </div>
        <Link
          to='/profile'
          style={{
            textDecoration: 'none',
            display: 'flex',
            color: location.pathname.startsWith('/profile') ? 'white' : 'gray'
          }}
        >
          <div className={styles.link_position_last}>
            <ProfileIcon
              type={
                location.pathname.startsWith('/profile')
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </div>
        </Link>
      </nav>
    </header>
  );
};
