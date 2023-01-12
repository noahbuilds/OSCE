import { MenuItem } from './menu.model';

export const EXAMINER_MENU: MenuItem[] = [
  {
    id: 1,
    label: 'EXAMINER_ITEMS.DASHBOARD.TEXT',
    link: '/examiner/dashboard',
    icon: 'grid',
  },
 
  {
    id: 2,
    label: 'EXAMINER_ITEMS.MARK.TEXT',
    icon: 'check',
    subItems: [
      {
        id: 1,
        label: 'EXAMINER_ITEMS.MARK.LIST.MARK_VIVA',
        link: '/examiner/mark-viva',
      },
      // {
      //   id: 2,
      //   label: 'EXAMINER_ITEMS.MARK.LIST.MARK_RESEARCH',
      //   link: '/examiner/mark-research',
      // },
      {
        id: 3,
        label: 'EXAMINER_ITEMS.MARK.LIST.MARK_PROCEDURE',
        link: '/examiner/mark-procedure',
      },
      // {
      //   id: 4,
      //   label: 'EXAMINER_ITEMS.MARK.LIST.MARK_EXPECTANT_CARE',
      //   link: '/examiner/mark-expectant-care',
      // }
    ]
  },

  {
    id: 2,
    label: 'EXAMINER_ITEMS.VIEW.TEXT',
    icon: 'eye',
    subItems: [
      {
        id: 1,
        label: 'EXAMINER_ITEMS.VIEW.LIST.CANDIDATE_INSTRUCTION',
        link: '/examiner/candidate-instruction',
      },
      {
        id: 2,
        label: 'EXAMINER_ITEMS.VIEW.LIST.PROCEDURE_INSTRUCTION',
        link: '/examiner/procedure-instruction',
      }
    ],
  },
  {
    id: 7,
    label: 'EXAMINER_ITEMS.LOGS.TEXT',
    link: '/examiner/activity-logs',
    icon: 'user-check',
  }
];

export const MANAGER_MENU: MenuItem[] = [
  {
    id: 11,
    label: 'MANAGER_ITEMS.DASHBOARD.TEXT',
    link: '/manager/dashboard',
    icon: 'grid',
  },
  {
    id: 12,
    label: 'MANAGER_ITEMS.START_EXAM.TEXT',
    link: '/manager/start-exam',
    icon: 'clock',
  },
  {
    id: 13,
    label: 'MANAGER_ITEMS.MANAGE_EXAM.TEXT',
    link: '/manager/manage-exam',
    icon: 'book',
  },
  {
    id: 2,
    label: 'MANAGER_ITEMS.MONITOR_EXAM.TEXT',
    icon: 'monitor',
    subItems: [
      {
        id: 1,
        label: 'MANAGER_ITEMS.MONITOR_EXAM.LIST.VIVA',
        link: '/manager/monitor-exam/viva',
      },
      // {
      //   id: 2,
      //   label: 'MANAGER_ITEMS.MONITOR_EXAM.LIST.RESEARCH',
      //   link: '/manager/monitor-exam/research',
      // },
      {
        id: 3,
        label: 'MANAGER_ITEMS.MONITOR_EXAM.LIST.OSCE',
        link: '/manager/monitor-exam/osce',
      },
      // {
      //   id: 4,
      //   label: 'MANAGER_ITEMS.MONITOR_EXAM.LIST.EXPECTANT_CARE',
      //   link: '/manager/monitor-exam/expectant-care',
      // },
    ]
  },
  {
    id: 16,
    label: 'MANAGER_ITEMS.DOWNLOAD_EXAM.TEXT',
    link: '/manager/download-exam',
    icon: 'download',
  },
  {
    id: 17,
    label: 'MANAGER_ITEMS.DOWNLOADED_EXAM.TEXT',
    link: '/manager/downloaded-exams',
    icon: 'layers',
  },
  {
    id: 18,
    label: 'MANAGER_ITEMS.WHITE_LIST.TEXT',
    link: '/manager/white-list',
    icon: 'check',
  },
  {
    id: 19,
    label: 'MANAGER_ITEMS.LOGS.TEXT',
    link: '/manager/activities-logs',
    icon: 'user-check',
  }
];


