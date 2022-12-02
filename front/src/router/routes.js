const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "test", component: () => import("pages/TutoPage.vue") },
    ],
  },
  {
    path: "/tasklists",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/TaskListsPage.vue") },
    ],
  },
  {
    path: "/tasklists/:id",
    children: [{ path: "", component: () => import("pages/TaskListPage.vue") }],
  },
  {
    path: "/tasklists/:id/tasks",
    children: [
      { path: "create", component: () => import("pages/CreateTaskPage.vue") },
    ],
  },
  {
    path: "/tasklists/:taskListId/tasks/:taskId",
    children: [
      { path: "", component: () => import("pages/TaskPage.vue") },
      { path: "edit", component: () => import("pages/UpdateTaskPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
