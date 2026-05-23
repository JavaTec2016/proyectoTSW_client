import React from 'react'

function Dashboard() {
    const content = `
    <body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
  <div class="app-wrapper">

    <!-- Header -->
    <nav class="app-header navbar navbar-expand bg-body">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-lte-toggle="sidebar" href="#" role="button">
              <i class="bi bi-list"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
      <div class="sidebar-brand">
        <a href="#" class="brand-link">
          <span class="brand-text fw-light">My Dashboard</span>
        </a>
      </div>
      <div class="sidebar-wrapper">
        <nav class="mt-2">
          <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu">
            <li class="nav-item">
              <a href="#" class="nav-link active">
                <i class="nav-icon bi bi-speedometer"></i>
                <p>Dashboard</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon bi bi-bar-chart"></i>
                <p>Reports</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <main class="app-main">
      <div class="app-content-header">
        <div class="container-fluid">
          <h3 class="mb-0">Hello, AdminLTE</h3>
        </div>
      </div>
      <div class="app-content">
        <div class="container-fluid">
          <div class="card">
            <div class="card-header"><h5 class="card-title">Welcome</h5></div>
            <div class="card-body">
              Edit this file to start building your dashboard.
            </div>
          </div>
        </div>
      </div>
    </main>

  </div>
</body>
    
    `
  return (
    <div dangerouslySetInnerHTML={{__html:content}}></div>
  )
}

export default Dashboard