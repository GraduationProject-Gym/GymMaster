<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_exercises', function (Blueprint $table) {
            //
            $table->foreignId('user_id')->constrained('users','id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('exercies_id')->constrained('exercises','id')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_exercises', function (Blueprint $table) {
            //
            $table->dropForeign('user_exercises_user_id_foreign');
            $table->dropColumn('user_id');
            $table->dropForeign('user_exercises_exercies_id_foreign');
            $table->dropColumn('exercies_id');
        });
    }
};
