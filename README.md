# cra-template-senai

Esté é o template oficial do SENAI para criação de aplicações em **Create React App**.\
O template foi desenvolvido a partir do [cra-template-typescript](https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript).

Para usar este template, adicione o comando `--template senai` ao criar um novo projeto.

Por exemplo:

```sh
npx create-react-app batata-app --template senai

# or

yarn create react-app batata-app --template senai
```

## Principais libs Instaladas

Como este projeto foi desenvolvido com baso no `cra-template-typescript`, ele já vem com o typescript habilitado por padrão. 

- [Ant Design](https://github.com/ant-design/ant-design) - Lib de React UI que contém um conjuto de componentes para construção de interfaces.
- [Axios](https://github.com/axios/axios) - Lib de requisições HTTP baseado em `promises` para o navegador e node.js.
- [React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) - Lib JS de controle de rotas de páginas com base em componentes JSX.

## Configuração de rotas

Para gerenciar as rotas vá para o arquivo de exemplo em `./src/route/routes.ts`.

Visualize as tipagens para auxiliar na inserção das informações das rotas.

Exemplo de uso:
```ts
// routes.ts

import { UserOutlined } from '@ant-design/icons';
import { RouteCustomProps } from './types';
import { formatRoutes } from './utils';
import { DefaultPage, ErrorPage, LoginPage } from '../pages';
import CustomLayout from '../layouts/Custom';
import { AvatarCommon } from '../components/_commons';

const routes: RouteCustomProps[] = formatRoutes([
  // Rota customizada
  {
    path: '/custom',
    exact: true,

    // o component é a prop utilizada para passar o componente que será renderizado como o conteudo de um layout
    component: DefaultPage,

    // O layout é utilizado para saber o tipo de visualização das páginas, tipos: 'public' | 'private' | 'custom'
    layout: 'custom',

    // Se a rota for layout custom, é obrigatório informar qual o componente do layout para ser renderizado
    layoutComponent: CustomLayout,

    // O page é utilizado para passar as informações da página,
    page: { title: 'Layout Custom' },
  },

  // Rota pública
  {
    path: '/',
    exact: true,
    component: DefaultPage,
    page: { title: 'Início' },
    // Caso queira que uma rota não seja redirecionada por estar autenticado utilize essa prop, só terá efeito nas rotas com layout 'public'
    redirectAuth: false,
  },

  // Rota privada
  {
    path: '/app',
    exact: true,
    component: DefaultPage,
    layout: 'private',
    page: { title: 'Página inícial' },
    // O menu é utilizado para a exibição dos itens na navegação lateral
    menu: { icon: UserOutlined, title: 'Aplicação' },
  },
  {
    path: '/dashboard',
    exact: true,
    component: DefaultPage,
    layout: 'private',
    // As roles são utilizada para válidar quais usuários podem acessar a página
    roles: ['admin'],
    page: { title: 'Página de dashboard' },
    menu: {
      icon: UserOutlined,
      title: 'Dashboard',
      // caso queira exibir uma copia dessa rota como sub-rota para renderizar no menu infore a prop insideSubmenu
      insideSubmenu: { icon: UserOutlined, title: 'Início' },
    },
    // É possível renderizar rotas aninhadas, se as sub rotas tiver a prop menu e for uma rota válida ela será exibida como sub-menu.
    routes: [
      {
        path: '/sub-page',
        exact: true,
        component: DefaultPage,
        menu: { icon: UserOutlined, title: 'Sub página' },
        page: { title: 'Sub página de exemplo' },
      },
    ],
  },

  // Rota privada com prop extra
  {
    path: '/profile',
    exact: true,
    component: DefaultPage,
    layout: 'private',
    page: { title: 'Perfil' },
    menu: { icon: AvatarCommon },

    // itilize essa prop para passar informações adicionais, se passar header com o valor true e for uma rota válida, ela será exibida no menu do header.
    extra: { header: true },
  },

  // Rotas de erro
  {
    path: '/403',
    exact: true,
    layout: 'custom',
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: '403',
      subTitle: 'Foi mal! Você não tem permissão para ver essa página.',
      status: 403,
    },
  },
  {
    path: '/500',
    layout: 'custom',
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: '500',
      subTitle: 'Eita! Algo de errado não está certo.',
      status: 500,
    },
    redirectAuth: false,
  },
  {
    path: '',
    layout: 'custom',
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: '404',
      subTitle: 'Ops! A página solicitada não existe.',
      status: 404,
    },
    redirectAuth: false,
  },
]);

export default routes;
```

Visualize a tipagem `RouteCustomProps` para ver todos os tipos de props, em `./src/route/types.ts`;

## Componentes de contexto

Para evitar perda de informações e melhor gerenciamento das informações por toda a aplicação, foram implementados dois componentes de contexto.

- **Authentication**: responsável pelo o armazenamento das informações do usuário logado. No componente `AuthenticationProvider` é necessário passar uma propriedade `storageManager`, responsável para o armazenamento das informações.

Exemplo de uso:
```tsx
// App.tsx

import { AuthenticationProvider } from './contexts';

function App() {
  return (
    // O callback é opcional, más é obrigatório passar um `children`
    <AuthenticationProvider storageManager={localStorage}>
      {({ isMounted }) => isMounded ? (
        <MyComponent />
      ) : (
        <MyLoadingComponent />
      )}
    </AuthenticationProvider>
  )
}

```
OBS: este componente pode ser reutilizado para aplicações em **React Native**

- **Service** - Responsável pelo gerenciamento de requisições HTTP com a lib **Axios**. No componente `ServiceProvider` é possível passar duas propiedades: `config` e `interceptors`, são respectivamentes, responsável pela configuração do metodo `Axios.create()` e dos interceptadores de requisições.

Exemplo de uso:
```tsx
// App.tsx

import { ServiceProvider } from './contexts';

function request(config) {
  // ...
}

function response(config) {
  // ...
}

function error(config) {
  // ...
}

function App() {
  return (
    // se não passar uma baseUrl, a service tentará utilizar a variável de ambiente REACT_APP_BASE_URL
    <ServiceProvider
      config={{ baseUrl: 'http://my-site.com' }}
      interceptors={(service) => ({
        request: [request, error],
        response: [response, error],
      })}
    >
      <MyComponent />
    </ServiceProvider>
  )
}
```

## Saiba mais

Para obter mais informações sobre o **Create React App**, consulte:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – Como criar um novo projeto.
- [User Guide](https://create-react-app.dev) – Como desenvolver projetos iniciados com Create React App.

## Agradecimento

Muito obrigado ao Jhon por me ajudar no projeto base para o desenvolvimento desse template.