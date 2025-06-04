<?php
session_start();
require_once 'db.php';

// Redirect if not logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title']);
    $content = trim($_POST['content']);
    
    if (!empty($title) && !empty($content)) {
        $stmt = $db->prepare("INSERT INTO news_posts (user_id, title, content) VALUES (?, ?, ?)");
        $stmt->execute([$_SESSION['user_id'], $title, $content]);
        $success = "News posted successfully!";
    } else {
        $error = "Title and content are required";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Post News</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .error { color: red; margin-bottom: 15px; }
        .success { color: green; margin-bottom: 15px; }
        input, textarea { display: block; width: 100%; padding: 8px; margin-bottom: 10px; }
        textarea { height: 200px; }
        button { padding: 10px 15px; background: #0066cc; color: white; border: none; cursor: pointer; }
        .logout { float: right; }
    </style>
</head>
<body>
    <div class="logout">
        Welcome, <?= htmlspecialchars($_SESSION['username']) ?> | 
        <a href="logout.php">Logout</a>
    </div>
    <h1>Post News</h1>
    
    <?php if (isset($error)): ?>
        <div class="error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    
    <?php if (isset($success)): ?>
        <div class="success"><?= htmlspecialchars($success) ?></div>
    <?php endif; ?>
    
    <form method="post">
        <input type="text" name="title" placeholder="News Title" required>
        <textarea name="content" placeholder="News Content" required></textarea>
        <button type="submit">Post News</button>
    </form>
</body>
</html>