import SvgColor from '@src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'داشبورد',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'کاربران',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'محصولات',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'وبلاگ',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'ورود',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
