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
        Schema::disableForeignKeyConstraints();

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('project_id')->nullable(); 
            $table->foreign('project_id')->references('id')->on('projects');
            $table->unsignedBigInteger('column_id');
            $table->foreign('column_id')->references('id')->on('columns');
            $table->string('name');
            $table->longText('description')->nullable();
            $table->date('due_date')->nullable();
            $table->unsignedBigInteger('status_id')->nullable(); // Status ID (külső kulcs)
            $table->foreign('status_id')->references('id')->on('statuses'); // Status külső kulcs
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
