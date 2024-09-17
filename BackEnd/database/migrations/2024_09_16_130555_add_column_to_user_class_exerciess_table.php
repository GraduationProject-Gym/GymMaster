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
        Schema::table('class_exerciess', function (Blueprint $table) {
            //
            $table->foreignId('class_id')->constrained('gymclass','id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('exercise_id')->constrained('exercises','id')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('class_exerciess', function (Blueprint $table) {
            //
            $table->dropForeign('class_exerciess_exercise_id_foreign');
            $table->dropColumn('exercise_id');
            $table->dropForeign('class_exerciess_class_id_foreign');
            $table->dropColumn('class_id');
        });
    }
};
