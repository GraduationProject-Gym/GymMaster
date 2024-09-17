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
        Schema::table('user_classes', function (Blueprint $table) {
            //
            $table->foreignId('user_id')->constrained('users','id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('class_id')->constrained('gymclass','id')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_classes', function (Blueprint $table) {
            //
            $table->dropForeign('user_classes_user_id_foreign');
            $table->dropColumn('user_id');
            $table->dropForeign('user_classes_class_id_foreign');
            $table->dropColumn('class_id');
        });
    }
};
