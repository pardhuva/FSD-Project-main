<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gardenly Seller Dashboard</title>
    <link rel="stylesheet" href="../public/styles/sellerdashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="dashboard-container">
        <!-- Mobile Header -->
        <header class="mobile-header">
            <button id="mobile-menu-toggle" class="menu-toggle">
                <i class="fas fa-bars"></i>
            </button>
            <div class="logo">Gardenly</div>
            <button id="theme-toggle" class="theme-toggle">
                <i class="fas fa-moon"></i>
                <i class="fas fa-sun"></i>
            </button>
        </header>

        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">Gardenly</div>
                <button id="sidebar-close" class="sidebar-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li class="active" data-page="dashboard">
                        <a href="#dashboard"><i class="fas fa-home"></i> Dashboard</a>
                    </li>
                    <li data-page="products">
                        <a href="#products"><i class="fas fa-box"></i> Products</a>
                    </li>
                    <li data-page="analytics">
                        <a href="#analytics"><i class="fas fa-chart-bar"></i> Analytics</a>
                    </li>
                    <li data-page="settings">
                        <a href="#settings"><i class="fas fa-cog"></i> Settings</a>
                    </li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <a href="/logout" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Dashboard Page -->
            <section id="dashboard-page" class="page active">
                <div class="page-header">
                    <h1>Dashboard</h1>
                    <p>Welcome back, <%= user.username %></p>
                </div>

                <!-- Metric Cards -->
                <div class="metric-cards">
                    <div class="card metric-card">
                        <div class="card-content">
                            <div class="metric-header">
                                <h3>Total Revenue</h3>
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="metric-value">$<%= metrics.totalRevenue %></div>
                            <div class="metric-change positive">Total revenue from all products</div>
                        </div>
                    </div>
                    <div class="card metric-card">
                        <div class="card-content">
                            <div class="metric-header">
                                <h3>Total Products</h3>
                                <i class="fas fa-box"></i>
                            </div>
                            <div class="metric-value"><%= metrics.totalProducts %></div>
                            <div class="metric-change">Active products in inventory</div>
                        </div>
                    </div>
                    <div class="card metric-card">
                        <div class="card-content">
                            <div class="metric-header">
                                <h3>Total Sold</h3>
                                <i class="fas fa-credit-card"></i>
                            </div>
                            <div class="metric-value"><%= metrics.totalSold %></div>
                            <div class="metric-change">Total units sold</div>
                        </div>
                    </div>
                    <div class="card metric-card">
                        <div class="card-content">
                            <div class="metric-header">
                                <h3>Low Stock Alert</h3>
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="metric-value"><%= metrics.lowStockProducts %></div>
                            <div class="metric-change negative">Products with less than 10 units</div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="dashboard-grid">
                    <div class="card chart-card">
                        <div class="card-header">
                            <h2>Revenue Overview</h2>
                        </div>
                        <div class="card-content">
                            <canvas id="revenue-chart"></canvas>
                        </div>
                    </div>
                    <div class="card chart-card">
                        <div class="card-header">
                            <h2>Sales by Category</h2>
                        </div>
                        <div class="card-content">
                            <canvas id="category-chart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Products Page -->
            <section id="products-page" class="page">
                <div class="page-header">
                    <h1>Products</h1>
                    <div class="header-actions">
                        <button id="add-product-btn" class="btn primary-btn" onclick="addProduct()">
                            <i class="fas fa-plus-circle"></i> Add Product
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h2>Product Inventory</h2>
                    </div>
                    <div class="card-content">
                        <div class="table-container">
                            <table id="products-table" class="data-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Sold</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% products.forEach(product => { %>
                                        <tr>
                                            <td><%= product.name %></td>
                                            <td><%= product.category %></td>
                                            <td>$<%= product.price.toFixed(2) %></td>
                                            <td><%= product.quantity %></td>
                                            <td><%= product.sold %></td>
                                            <td>
                                                <% if (product.quantity < 10) { %>
                                                    <span class="status low-stock">Low Stock</span>
                                                <% } else { %>
                                                    <span class="status in-stock">In Stock</span>
                                                <% } %>
                                            </td>
                                            <td>
                                                <button class="action-btn edit-btn" onclick="editProduct('<%= product.id %>')">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="action-btn delete-btn" onclick="deleteProduct('<%= product.id %>')">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    <% }) %>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Analytics Page -->
            <section id="analytics-page" class="page">
                <div class="page-header">
                    <h1>Analytics</h1>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h2>Sales Trends</h2>
                    </div>
                    <div class="card-content">
                        <canvas id="sales-trends-chart"></canvas>
                    </div>
                </div>
            </section>

            <!-- Settings Page -->
            <section id="settings-page" class="page">
                <div class="page-header">
                    <h1>Settings</h1>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h2>Account Settings</h2>
                    </div>
                    <div class="card-content">
                        <form id="settings-form">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" value="<%= user.username %>" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" value="<%= user.email %>" required>
                            </div>
                            <div class="form-group">
                                <label>Theme</label>
                                <div class="theme-selector">
                                    <button type="button" id="theme-selector-btn" class="btn">
                                        <i class="fas fa-moon"></i> Dark Mode
                                    </button>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn primary-btn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <!-- Overlay -->
    <div id="overlay" class="overlay"></div>

    <!-- Add Product Modal -->
    <div id="add-product-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Product</h2>
                <button class="close-modal">&times;</button>
            </div>
            <form id="add-product-form">
                <div class="form-group">
                    <label for="product-name">Product Name</label>
                    <input type="text" id="product-name" required>
                </div>
                <div class="form-group">
                    <label for="product-price">Price</label>
                    <input type="number" id="product-price" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="product-quantity">Quantity</label>
                    <input type="number" id="product-quantity" required>
                </div>
                <div class="form-group">
                    <label for="product-category">Category</label>
                    <select id="product-category" required>
                        <option value="Plants">Plants</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Tools">Tools</option>
                        <option value="Pots">Pots</option>
                        <option value="Fertilizers">Fertilizers</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="product-description">Description</label>
                    <textarea id="product-description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="product-image">Image URL</label>
                    <input type="text" id="product-image" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn primary-btn">Add Product</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Initialize charts with dynamic data
        const revenueChart = new Chart(document.getElementById('revenue-chart'), {
            type: 'line',
            data: {
                labels: JSON.parse('<%- JSON.stringify(chartData.revenue.labels) %>'),
                datasets: [{
                    label: 'Revenue',
                    data: JSON.parse('<%- JSON.stringify(chartData.revenue.data) %>'),
                    borderColor: '#4CAF50',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        const categoryChart = new Chart(document.getElementById('category-chart'), {
            type: 'doughnut',
            data: {
                labels: JSON.parse('<%- JSON.stringify(chartData.categories.labels) %>'),
                datasets: [{
                    data: JSON.parse('<%- JSON.stringify(chartData.categories.data) %>'),
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FFC107',
                        '#9C27B0',
                        '#FF5722'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Product management functions
        function addProduct() {
            const modal = document.getElementById('add-product-modal');
            const overlay = document.getElementById('overlay');
            modal.style.display = 'block';
            overlay.style.display = 'block';
        }

        // Close modal when clicking the close button or overlay
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('add-product-modal').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        });

        document.getElementById('overlay').addEventListener('click', () => {
            document.getElementById('add-product-modal').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        });

        // Handle add product form submission
        document.getElementById('add-product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form data
            const name = document.getElementById('product-name').value.trim();
            const price = parseFloat(document.getElementById('product-price').value);
            const quantity = parseInt(document.getElementById('product-quantity').value);
            const category = document.getElementById('product-category').value;
            const description = document.getElementById('product-description').value.trim();
            const image = document.getElementById('product-image').value.trim();

            if (!name || !price || !quantity || !category || !description || !image) {
                alert('Please fill in all fields');
                return;
            }

            if (isNaN(price) || price <= 0) {
                alert('Please enter a valid price');
                return;
            }

            if (isNaN(quantity) || quantity < 0) {
                alert('Please enter a valid quantity');
                return;
            }

            const productData = {
                name,
                price,
                quantity,
                category,
                description,
                image
            };

            fetch('/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message === 'Product added successfully') {
                    location.reload();
                } else {
                    alert(data.message || 'Error adding product');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding product. Please try again.');
            });
        });

        function editProduct(productId) {
            if (!productId) {
                alert('Invalid product ID');
                return;
            }

            fetch(`/api/seller/products/${productId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(product => {
                    if (!product) {
                        throw new Error('Product not found');
                    }

                    // Show edit modal with pre-filled data
                    const modal = document.getElementById('add-product-modal');
                    const overlay = document.getElementById('overlay');
                    
                    document.getElementById('product-name').value = product.name || '';
                    document.getElementById('product-price').value = product.price || '';
                    document.getElementById('product-quantity').value = product.quantity || '';
                    document.getElementById('product-category').value = product.category || '';
                    document.getElementById('product-description').value = product.description || '';
                    document.getElementById('product-image').value = product.image || '';
                    
                    modal.style.display = 'block';
                    overlay.style.display = 'block';
                    
                    // Change form submission to update instead of add
                    const form = document.getElementById('add-product-form');
                    form.onsubmit = (e) => {
                        e.preventDefault();
                        updateProduct(productId);
                    };
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error fetching product data. Please try again.');
                });
        }

        function updateProduct(productId) {
            if (!productId) {
                alert('Invalid product ID');
                return;
            }

            // Validate form data
            const name = document.getElementById('product-name').value.trim();
            const price = parseFloat(document.getElementById('product-price').value);
            const quantity = parseInt(document.getElementById('product-quantity').value);
            const category = document.getElementById('product-category').value;
            const description = document.getElementById('product-description').value.trim();
            const image = document.getElementById('product-image').value.trim();

            if (!name || !price || !quantity || !category || !description || !image) {
                alert('Please fill in all fields');
                return;
            }

            if (isNaN(price) || price <= 0) {
                alert('Please enter a valid price');
                return;
            }

            if (isNaN(quantity) || quantity < 0) {
                alert('Please enter a valid quantity');
                return;
            }

            const productData = {
                name,
                price,
                quantity,
                category,
                description,
                image
            };

            fetch(`/api/seller/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message === 'Product updated successfully') {
                    location.reload();
                } else {
                    alert(data.message || 'Error updating product');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating product. Please try again.');
            });
        }

        function deleteProduct(productId) {
            if (!productId) {
                alert('Invalid product ID');
                return;
            }

            if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
                fetch(`/api/seller/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.message === 'Product deleted successfully') {
                        location.reload();
                    } else {
                        alert(data.message || 'Error deleting product');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error deleting product. Please try again.');
                });
            }
        }
    </script>
    <script src="../public/scripts/sellerdashboard.js"></script>
</body>
</html>
