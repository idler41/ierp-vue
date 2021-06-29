const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    avatar: '',
    nickname: 'Super Admin',
    resources: [
      {
        path: '/test',
        key: 'test',
        icon: '',
        level: 1,
        title: '测试页面'
      },
      {
        path: '/sys-manager',
        key: 'sys-manager',
        icon: '',
        title: '系统管理',
        level: 1,
        children: [
          {
            path: '/user',
            key: 'user',
            icon: '',
            title: '用户管理',
            level: 2
          },
          {
            path: '/role',
            key: 'role',
            icon: '',
            title: '角色管理',
            level: 2
          },
          {
            path: '',
            key: 'test-level',
            icon: '',
            title: '测试层级',
            level: 2,
            children: [
              {
                path: '/test-level-1',
                key: 'test-level-1',
                icon: '',
                title: '测试层级1',
                level: 3
              },
              {
                path: '/test-level-2',
                key: 'test-level-2',
                icon: '',
                title: '测试层级2',
                level: 3
              }
            ]
          }
        ]
      }
    ],
    permissions: []
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
