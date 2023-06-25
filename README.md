## Installation

#### 1. Clone the project
```bash
git clone https://github.com/aliomidvar1995/nadin-soft.git
```

#### 2. Run `composer install`
Navigate into project folder using terminal and run

```bash
cd nadin-soft/laravel
```
```bash
composer install
```

#### 3. Copy `.env.example` into `.env`

```bash
cp .env.example .env
```

#### 4. Set encryption key

```bash
php artisan key:generate
```

#### 5. Run migrations

```bash
php artisan migrate
```

#### 6. Start artisan development server

```bash
php artisan serve
```

#### 7. Front End section

```bash
cd ../vue
```

#### 8. Run `npm install`

```bash
npm install
```

#### 9. Run `npm run dev`

```bash
npm run dev
```