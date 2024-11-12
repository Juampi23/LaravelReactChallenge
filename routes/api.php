use App\Http\Controllers\PatientController;

Route::post('/patients', [PatientController::class, 'store']);
