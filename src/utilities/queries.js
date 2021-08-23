import { companyService, userService, placeService, goalService, strategyService, outcomeService, initiativeService } from '../services';

export const companiesQuery = async () => {
  const { data } = await companyService.getAll();
  return data;
};

export const companyQuery = async id => {
  const { data } = await companyService.getOne(id);
  return data;
};

export const userQuery = async id => {
  const { data } = await userService.getOne(id);
  return data;
};

export const placesQuery = async () => {
  const { data } = await placeService.getAll();
  return data;
};

export const placeQuery = async placeId => {
  const { data } = await placeService.getOne(placeId);
  return data;
};

export const strategiesQuery = async (companyId, placeId) => {
  const { data } = await strategyService.getAll({ companyId, placeId });
  return data;
};

export const strategyQuery = async id => {
  const { data } = await strategyService.getOne(id);
  return data;
};

export const goalsQuery = async () => {
  const { data } = await goalService.getAll();
  return data;
};

export const outcomeQuery = async id => {
  const { data } = await outcomeService.getOne(id);
  return data;
};

export const intiativeQuery = async id => {
  const { data } = await initiativeService.getOne(id);
  return data;
};

export const activitiesQuery = async () => {
  return [
    {
      id: '6ba6f410-43a5-49c2-bdee-e62f39216c6b',
      user_id: '8a8f861d-b81c-4414-bc5c-51a2e617d970',
      company_id: '3a0c8fd2-9d34-4c7a-b37f-386843750a0b',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'dignissimos odio facilis quaerat aut perferendis eaque dolores esse corporis',
      description: 'quia rerum illo excepturi ut ullam cum',
      event: 'CreateStrategy',
      link: '/outcomes/71af341f-65ec-4638-a3d6-07e007f2fb8e',
      createdAt: '2021-08-20T02:52:48.110+07:00',
      company: {
        id: '3a0c8fd2-9d34-4c7a-b37f-386843750a0b',
        name: 'Abernathy - Wilderman',
        description: 'eaque quae quasi quo doloremque quae reprehenderit qui sit',
        logo: 'http://placeimg.com/640/480/people',
        type: 4,
        createdAt: '2021-08-20T02:52:48.102+07:00',
        updatedAt: '2021-08-20T02:52:48.102+07:00',
        relationship: {},
      },
      user: {
        id: '8a8f861d-b81c-4414-bc5c-51a2e617d970',
        email: 'Ozella_Miller5@hotmail.com',
        name: 'Kristin Ritchie',
        image: 'https://cdn.fakercloud.com/avatars/VinThomas_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.109+07:00',
        updatedAt: '2021-08-20T02:52:48.109+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '8d1fb328-71d2-4bc2-8ceb-040d19f6cdc8',
      user_id: '999b5831-c1d3-4e88-9439-74f899ed4d78',
      company_id: '47dac7cf-4f51-4135-a4bf-ee5fc6d28b8e',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'assumenda nihil necessitatibus eum dolorum itaque illum nemo',
      description: 'nemo ut amet beatae eum',
      event: 'NewUser',
      link: '/outcomes/4f9adac2-53bc-4b3c-9e82-bec9731435e5',
      createdAt: '2021-08-20T02:52:48.125+07:00',
      company: {
        id: '47dac7cf-4f51-4135-a4bf-ee5fc6d28b8e',
        name: 'Balistreri, Zemlak and Beahan',
        description: 'excepturi aut at minima nisi',
        logo: 'http://placeimg.com/640/480/business',
        type: 1,
        createdAt: '2021-08-20T02:52:48.118+07:00',
        updatedAt: '2021-08-20T02:52:48.118+07:00',
        relationship: {},
      },
      user: {
        id: '999b5831-c1d3-4e88-9439-74f899ed4d78',
        email: 'Willa_Frami36@gmail.com',
        name: 'Alberta Kovacek',
        image: 'https://cdn.fakercloud.com/avatars/mizko_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.125+07:00',
        updatedAt: '2021-08-20T02:52:48.125+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: 'e8a5636a-20ab-4839-8215-b2956ab02f88',
      user_id: '6f806c6b-cf54-437f-84a2-e76d25c199b0',
      company_id: 'fae96b95-3d93-45f3-a498-b2181e7b60b3',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'temporibus doloribus est aut et laboriosam unde',
      description: 'est excepturi nostrum aut voluptates ipsa quia porro expedita ipsum',
      event: 'MilestoneComplete',
      link: '/outcomes/0fe80ce5-3289-416e-ac02-7ba670f346b3',
      createdAt: '2021-08-20T02:52:48.136+07:00',
      company: {
        id: 'fae96b95-3d93-45f3-a498-b2181e7b60b3',
        name: 'Padberg - Witting',
        description: 'sed perspiciatis ut nulla voluptatem incidunt',
        logo: 'http://placeimg.com/640/480/abstract',
        type: 2,
        createdAt: '2021-08-20T02:52:48.128+07:00',
        updatedAt: '2021-08-20T02:52:48.128+07:00',
        relationship: {},
      },
      user: {
        id: '6f806c6b-cf54-437f-84a2-e76d25c199b0',
        email: 'Josephine.Batz@gmail.com',
        name: 'Mrs. Tabitha Klocko',
        image: 'https://cdn.fakercloud.com/avatars/boxmodel_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.135+07:00',
        updatedAt: '2021-08-20T02:52:48.135+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '5bd195d7-9dcb-4ba2-8181-0ceddbd08e76',
      user_id: '8b7623a9-6869-4654-8366-14f88034b018',
      company_id: '3b901e53-7b1e-48ec-be20-2f52b4107951',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'cupiditate quia deserunt eaque ut velit et nisi laudantium tempora',
      description: 'voluptatem dolorum cum ut magni et libero nam magni rem',
      event: 'CreateInitiative',
      link: '/outcomes/a584650c-ebf0-41f5-9ad0-5a8df05e553e',
      createdAt: '2021-08-20T02:52:48.147+07:00',
      company: {
        id: '3b901e53-7b1e-48ec-be20-2f52b4107951',
        name: "Willms - O'Kon",
        description: 'iure eligendi est delectus libero eum',
        logo: 'http://placeimg.com/640/480/nightlife',
        type: 3,
        createdAt: '2021-08-20T02:52:48.139+07:00',
        updatedAt: '2021-08-20T02:52:48.139+07:00',
        relationship: {},
      },
      user: {
        id: '8b7623a9-6869-4654-8366-14f88034b018',
        email: 'Sylvia.Waters@hotmail.com',
        name: 'Lloyd Dare',
        image: 'https://cdn.fakercloud.com/avatars/brandonmorreale_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.146+07:00',
        updatedAt: '2021-08-20T02:52:48.146+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '0ab7e605-13ba-4f25-ac20-bb4c2d515821',
      user_id: 'ec21d605-740b-4ecc-b837-b60d39337e0c',
      company_id: '9499411b-8964-4825-ac8d-600042b71bbe',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'laborum maxime commodi ea in culpa voluptatem quia maxime',
      description: 'asperiores dolorem quos libero in quaerat nesciunt sed autem',
      event: 'MilestoneComplete',
      link: '/outcomes/9ffa6beb-5cec-44b4-8720-2fa69fe6b473',
      createdAt: '2021-08-20T02:52:48.159+07:00',
      company: {
        id: '9499411b-8964-4825-ac8d-600042b71bbe',
        name: 'Reilly LLC',
        description: 'ipsum eius incidunt non tempore est cumque id sed ea',
        logo: 'http://placeimg.com/640/480/nightlife',
        type: 4,
        createdAt: '2021-08-20T02:52:48.150+07:00',
        updatedAt: '2021-08-20T02:52:48.150+07:00',
        relationship: {},
      },
      user: {
        id: 'ec21d605-740b-4ecc-b837-b60d39337e0c',
        email: 'Olin15@hotmail.com',
        name: 'Angelo Kulas',
        image: 'https://cdn.fakercloud.com/avatars/desastrozo_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.158+07:00',
        updatedAt: '2021-08-20T02:52:48.158+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '3bc72e9a-012e-4a7d-93c5-bce257f9989b',
      user_id: '9b794720-f836-4d2a-a1df-cf5c7ba1ac1e',
      company_id: '7b19db12-c257-4e32-bba0-77a3e011ea6d',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'fuga et minus hic enim impedit',
      description: 'neque est accusantium et quia unde qui consequatur',
      event: 'NewUser',
      link: '/outcomes/f2dfaa66-dbab-481c-a5ac-2e2bbb5f8dd9',
      createdAt: '2021-08-20T02:52:48.169+07:00',
      company: {
        id: '7b19db12-c257-4e32-bba0-77a3e011ea6d',
        name: 'Bechtelar LLC',
        description: 'rerum veniam eligendi quae reprehenderit sunt',
        logo: 'http://placeimg.com/640/480/cats',
        type: 3,
        createdAt: '2021-08-20T02:52:48.161+07:00',
        updatedAt: '2021-08-20T02:52:48.161+07:00',
        relationship: {},
      },
      user: {
        id: '9b794720-f836-4d2a-a1df-cf5c7ba1ac1e',
        email: 'Jordon.Okuneva74@gmail.com',
        name: 'Michelle Pouros',
        image: 'https://cdn.fakercloud.com/avatars/bargaorobalo_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.168+07:00',
        updatedAt: '2021-08-20T02:52:48.168+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '04254447-af05-4584-888f-8b2377738646',
      user_id: '7c3a00a1-f466-4f2c-a516-6aac3a6d0e9d',
      company_id: 'b2346d35-18ea-4f54-92f9-5ca91e4a314c',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'facere ad repellat ratione dignissimos',
      description: 'at neque quae quos et eum numquam et ut',
      event: 'CreateStrategy',
      link: '/outcomes/b7cec3d7-85cd-4fa6-b19b-103fbdc4a465',
      createdAt: '2021-08-20T02:52:48.180+07:00',
      company: {
        id: 'b2346d35-18ea-4f54-92f9-5ca91e4a314c',
        name: 'Fahey - Simonis',
        description: 'quod nemo minima sunt quia vel',
        logo: 'http://placeimg.com/640/480/city',
        type: 1,
        createdAt: '2021-08-20T02:52:48.172+07:00',
        updatedAt: '2021-08-20T02:52:48.172+07:00',
        relationship: {},
      },
      user: {
        id: '7c3a00a1-f466-4f2c-a516-6aac3a6d0e9d',
        email: 'Nickolas_Ebert@gmail.com',
        name: 'Dr. Joan Orn',
        image: 'https://cdn.fakercloud.com/avatars/tumski_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.179+07:00',
        updatedAt: '2021-08-20T02:52:48.179+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '58ebcbc7-a7a9-4873-b674-50352b394ca2',
      user_id: '8c33510f-b84a-431d-a246-83f05f9a7b09',
      company_id: '5acd8f7d-78cd-407d-9d8f-16b3567b39f0',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'sed consectetur sed dicta quod excepturi',
      description: 'quisquam quod sunt voluptas et',
      event: 'CreateOutcome',
      link: '/outcomes/33b36f0e-dea2-4a26-a59b-a8695ce7bb24',
      createdAt: '2021-08-20T02:52:48.190+07:00',
      company: {
        id: '5acd8f7d-78cd-407d-9d8f-16b3567b39f0',
        name: 'Bernhard - Collins',
        description: 'dolore facere et labore asperiores consectetur',
        logo: 'http://placeimg.com/640/480/technics',
        type: 5,
        createdAt: '2021-08-20T02:52:48.182+07:00',
        updatedAt: '2021-08-20T02:52:48.182+07:00',
        relationship: {},
      },
      user: {
        id: '8c33510f-b84a-431d-a246-83f05f9a7b09',
        email: 'Jennyfer_Pfannerstill@hotmail.com',
        name: 'Jessica Pouros',
        image: 'https://cdn.fakercloud.com/avatars/iamkarna_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.189+07:00',
        updatedAt: '2021-08-20T02:52:48.189+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '1c4a9e61-91f2-4ad3-9691-05089b85bb53',
      user_id: 'f4758d92-7b06-4555-b1ac-6f5af7d5fc1b',
      company_id: '9ca2d8d0-6a77-48a4-80d4-3feeba349915',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'numquam molestiae rem numquam consequatur iure',
      description: 'aliquam voluptatem sit tenetur voluptatem quod odio voluptas iste',
      event: 'CreateOutcome',
      link: '/outcomes/9e80d2a9-b454-470b-a2d5-577eec5fecb7',
      createdAt: '2021-08-20T02:52:48.200+07:00',
      company: {
        id: '9ca2d8d0-6a77-48a4-80d4-3feeba349915',
        name: 'Franecki, Romaguera and Bayer',
        description: 'quos voluptatum nemo dolorum ut esse aut et unde omnis',
        logo: 'http://placeimg.com/640/480/cats',
        type: 5,
        createdAt: '2021-08-20T02:52:48.192+07:00',
        updatedAt: '2021-08-20T02:52:48.192+07:00',
        relationship: {},
      },
      user: {
        id: 'f4758d92-7b06-4555-b1ac-6f5af7d5fc1b',
        email: 'Darion13@yahoo.com',
        name: 'Miss Kristine Williamson',
        image: 'https://cdn.fakercloud.com/avatars/kylefoundry_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.199+07:00',
        updatedAt: '2021-08-20T02:52:48.199+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '6d6ae8af-2c13-4d7e-b8da-9e881caecef6',
      user_id: '85e1ccc4-3b02-4287-b2b9-a9381127caf4',
      company_id: '0c5065bd-7ba0-48d9-b7de-d4943b2f6401',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'consequatur itaque ut et non cupiditate eius quo',
      description: 'perferendis quo asperiores aut molestias nobis voluptatem nesciunt laudantium sint',
      event: 'CreateEntity',
      link: '/outcomes/a94dc252-51fe-4ab0-8093-28a4cbfc5998',
      createdAt: '2021-08-20T02:52:48.210+07:00',
      company: {
        id: '0c5065bd-7ba0-48d9-b7de-d4943b2f6401',
        name: 'Considine - Gaylord',
        description: 'nisi qui dolor est fugiat assumenda dolorem nam inventore',
        logo: 'http://placeimg.com/640/480/transport',
        type: 5,
        createdAt: '2021-08-20T02:52:48.202+07:00',
        updatedAt: '2021-08-20T02:52:48.202+07:00',
        relationship: {},
      },
      user: {
        id: '85e1ccc4-3b02-4287-b2b9-a9381127caf4',
        email: 'Sofia_Bogan43@hotmail.com',
        name: 'Jaime Hyatt',
        image: 'https://cdn.fakercloud.com/avatars/flexrs_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.209+07:00',
        updatedAt: '2021-08-20T02:52:48.209+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '6aca44db-b712-4a69-bed4-6a6335998d35',
      user_id: '95dcdd28-932b-480e-b6ab-f33606f4a106',
      company_id: '91b29115-59e4-46a6-a856-466980e82812',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'fugiat voluptatum libero aspernatur sequi aliquam',
      description: 'voluptatem esse omnis fugiat dolorem sed consequatur',
      event: 'CreateStrategy',
      link: '/outcomes/26d0453a-e268-4d96-956f-4c0068a6f2c0',
      createdAt: '2021-08-20T02:52:48.221+07:00',
      company: {
        id: '91b29115-59e4-46a6-a856-466980e82812',
        name: "Parisian, O'Hara and Bechtelar",
        description: 'magni et quae qui commodi mollitia',
        logo: 'http://placeimg.com/640/480/transport',
        type: 1,
        createdAt: '2021-08-20T02:52:48.212+07:00',
        updatedAt: '2021-08-20T02:52:48.212+07:00',
        relationship: {},
      },
      user: {
        id: '95dcdd28-932b-480e-b6ab-f33606f4a106',
        email: 'Lew_Hodkiewicz56@gmail.com',
        name: 'Essie Mertz',
        image: 'https://cdn.fakercloud.com/avatars/nelsonjoyce_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.220+07:00',
        updatedAt: '2021-08-20T02:52:48.220+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
    {
      id: '09f5ee36-7040-47ae-96bf-71b8068853db',
      user_id: 'a521f923-f2a0-45ef-a1bd-6fb22dcd6293',
      company_id: '80f7a5b6-9234-4543-ae9d-42a77c354ece',
      place_id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
      type: 2,
      name: 'exercitationem dolorem optio nemo ad nobis quia dolores enim',
      description: 'sint est iure dignissimos suscipit eum facere excepturi occaecati esse',
      event: 'NewUser',
      link: '/outcomes/918618e9-e83e-4fc1-97ff-82fefc05a698',
      createdAt: '2021-08-20T02:52:48.237+07:00',
      company: {
        id: '80f7a5b6-9234-4543-ae9d-42a77c354ece',
        name: 'Dach - Brakus',
        description: 'voluptatem consequatur facilis inventore dolorem cumque',
        logo: 'http://placeimg.com/640/480/transport',
        type: 3,
        createdAt: '2021-08-20T02:52:48.224+07:00',
        updatedAt: '2021-08-20T02:52:48.224+07:00',
        relationship: {},
      },
      user: {
        id: 'a521f923-f2a0-45ef-a1bd-6fb22dcd6293',
        email: 'Brody_Schneider8@hotmail.com',
        name: 'Rebecca Raynor MD',
        image: 'https://cdn.fakercloud.com/avatars/laurengray_128.jpg',
        remember_me_token: null,
        createdAt: '2021-08-20T02:52:48.231+07:00',
        updatedAt: '2021-08-20T02:52:48.231+07:00',
        relationship: {},
      },
      place: {
        id: 'e3ea6195-3456-4622-bd80-ba146a6c2788',
        name: 'Bundaberg',
        geoPosition: '-24.8699638,152.3234748,12z',
        geoShape: null,
        createdAt: '2021-08-20T02:51:48.155+07:00',
        updatedAt: '2021-08-20T02:51:48.155+07:00',
      },
    },
  ];
};
