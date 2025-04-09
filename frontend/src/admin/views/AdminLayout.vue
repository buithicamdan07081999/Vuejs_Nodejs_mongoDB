<template>
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white p-4">
        <h1 class="text-2xl font-bold mb-4">Admin</h1>
        <ul>
          <li class="mb-2"><router-link to="/admin/dashboard">Dashboard</router-link></li>
          <li class="mb-2"><router-link to="/admin/products">Products</router-link></li>
          <li class="mb-2"><router-link to="#">Orders</router-link></li>
        </ul>
      </aside>
  
      <!-- Main content -->
      <main class="flex-1 bg-gray-100 p-6">
        <router-view />
      </main>
    </div>
  </template>
  